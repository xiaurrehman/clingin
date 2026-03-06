import { BadRequestException, Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
  ) { }

  async signup(dto: SignupDto) {
    const existing = await this.prisma.users.findUnique({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already exist');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.users.create({
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
        email: dto.email,
        password: hashed,
        phone: dto.phone || '',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Create user profile with additional information
    if (dto.jobRole || dto.licenseNumber || dto.extension || dto.instituteName ||
        dto.addressLine1 || dto.townCity || dto.country) {
      try {
        await this.prisma.user_profiles.create({
          data: {
            user_id: user.id,
            job_role: dto.jobRole,
            license_number: dto.licenseNumber,
            extension: dto.extension,
            institute_name: dto.instituteName,
            address_line_1: dto.addressLine1,
            town_city: dto.townCity,
            country: dto.country || 'United Kingdom',
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
      } catch (profileError) {
        console.error('Failed to create user profile:', profileError);
        // Continue with signup even if profile creation fails
      }
    }

    // Create activation record - user needs admin approval
    // First, delete any existing activation records for this user
    await this.prisma.activations.deleteMany({
      where: { user_id: user.id },
    });

    const activationCode = generateSixDigitCode();
    const activationRecord = await this.prisma.activations.create({
      data: {
        user_id: user.id,
        code: activationCode,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Send activation code to user (for reference, not for user activation) - non-blocking
    this.mailService.sendActivationCode(dto.email, activationCode).catch(error => {
      console.error('Failed to send activation email:', error);
    });

    // Generate tokens for the newly created user
    const payload = { sub: user.id, email: user.email };
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m';
    const options: JwtSignOptions = { expiresIn: expiresIn as any };
    const access_token = this.jwtService.sign(payload, options);

    // Generate a refresh token
    const refresh_token = await this.generateRefreshToken(user.id);

    return {
      message: "User created successfully. Account pending admin approval",
      activationCode,
      access_token: access_token,
      refresh_token: refresh_token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      activationRecord
    };
  }

  // Admin-only method to activate user account
  async activateAccountByAdmin(userId: number, adminId: number) {
    // Verify that the requesting user is an admin
    const adminRoles = await this.prisma.user_roles.findMany({
      where: { user_id: adminId },
      include: {
        roles: true
      }
    });

    const isAdmin = adminRoles.some(ur =>
      ur.roles.permissions?.includes('admin') ||
      ur.roles.permissions?.includes('superadmin')
    );

    if (!isAdmin) {
      throw new ForbiddenException('Only admins can activate accounts');
    }

    // Find the activation record for the user
    const activation = await this.prisma.activations.findFirst({
      where: { user_id: userId, completed: false },
    });

    if (!activation) {
      throw new BadRequestException('No pending activation found for this user');
    }

    // Update the activation as completed
    const updatedActivation = await this.prisma.activations.update({
      where: { id: activation.id },
      data: {
        completed: true,
        completed_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Optionally, send notification to user about account activation
    const user = await this.prisma.users.findUnique({
      where: { id: userId }
    });

    if (user) {
      await this.mailService.sendAccountActivatedNotification(user.email);
    }

    return {
      message: 'Account activated successfully',
      user: {
        id: userId,
      }
    };
  }

  // Alternative method: Allow activation with code (for initial setup or special cases)
  async activateAccountWithCode(dto: ActivateAccountDto) {
    // Find the activation record by code - get the most recent one if multiple exist
    const activation = await this.prisma.activations.findFirst({
      where: { 
        code: dto.code,
        completed: false 
      },
      include: {
        users: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    if (!activation) {
      // Check if the code exists but is already completed
      const completedActivation = await this.prisma.activations.findFirst({
        where: { code: dto.code, completed: true },
        include: { users: true }
      });

      if (completedActivation) {
        throw new BadRequestException('Activation code has already been used');
      }
      throw new BadRequestException('Invalid or expired activation code');
    }

    // Check if activation is expired (24 hours from creation)
    const now = new Date();
    const createdAt = new Date(activation.created_at || now);
    const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceCreation > 24) {
      throw new BadRequestException('Activation code has expired. Please request a new one');
    }

    // Update the activation as completed
    const updatedActivation = await this.prisma.activations.update({
      where: { id: activation.id },
      data: {
        completed: true,
        completed_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Generate tokens for the activated user
    const payload = { sub: activation.user_id, email: activation.users.email };
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m';
    const options: JwtSignOptions = { expiresIn: expiresIn as any };
    const accessToken = this.jwtService.sign(payload, options);

    // Generate a refresh token
    const refreshToken = await this.generateRefreshToken(activation.user_id);

    return {
      message: 'Account activated successfully',
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: activation.user_id,
        email: activation.users.email,
        firstName: activation.users.first_name,
        lastName: activation.users.last_name,
      }
    };
  }

  // Resend activation code
  async resendActivationCode(email: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('User not found with this email');

    // Check if user already has an activated account
    const existingActivation = await this.prisma.activations.findFirst({
      where: { user_id: user.id, completed: true },
    });

    if (existingActivation) {
      throw new BadRequestException('Account is already activated. Please login');
    }

    // Delete any existing activation records
    await this.prisma.activations.deleteMany({
      where: { user_id: user.id },
    });

    // Generate new activation code
    const activationCode = generateSixDigitCode();
    const activationRecord = await this.prisma.activations.create({
      data: {
        user_id: user.id,
        code: activationCode,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Send activation code to user - non-blocking
    this.mailService.sendActivationCode(email, activationCode).catch(error => {
      console.error('Failed to send activation email:', error);
    });

    return {
      message: 'Activation code resent successfully',
      activationCode, // In development, return the code
    };
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.users.findUnique({ where: { email: dto.email } });
    if (!user) throw new BadRequestException('Invalid email');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new BadRequestException('Incorrect Password');

    // Check if account is activated
    const activation = await this.prisma.activations.findFirst({
      where: { user_id: user.id },
    });

    if (activation && !activation.completed) {
      throw new UnauthorizedException('Account not activated. Please contact admin for activation');
    }

    const payload = { sub: user.id, email: user.email };
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m';
    const options: JwtSignOptions = { expiresIn: expiresIn as any };
    const accessToken = this.jwtService.sign(payload, options);

    // Generate a refresh token
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    }
  }

  async forgetPassword(dto: ForgetPasswordDto) {
    const user = await this.prisma.users.findUnique({ where: { email: dto.email } });
    if (!user) throw new BadRequestException('Invalid Email');

    const code = generateSixDigitCode();

    // Delete any existing reset codes for this user
    await this.prisma.reminders.deleteMany({
      where: { user_id: user.id, completed: false },
    });

    // Create a reminder record for password reset
    await this.prisma.reminders.create({
      data: {
        user_id: user.id,
        code,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    await this.mailService.sendPasswordResetCode(dto.email, code);
    return { message: 'Password reset code sent successfully' };
  }

  // Verify email and code for password reset
  async verifyResetEmail(email: string, code: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Invalid email');

    const reminder = await this.prisma.reminders.findFirst({
      where: { 
        code, 
        user_id: user.id,
        completed: false 
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    if (!reminder) {
      // Check if code was already used
      const completedReminder = await this.prisma.reminders.findFirst({
        where: { code, user_id: user.id, completed: true }
      });
      
      if (completedReminder) {
        throw new BadRequestException('Reset code has already been used');
      }
      throw new BadRequestException('Invalid or expired reset code');
    }

    // Check if reminder is expired (1 hour from creation)
    const now = new Date();
    const createdAt = new Date(reminder.created_at || now);
    const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceCreation > 1) {
      throw new BadRequestException('Reset code has expired. Please request a new one');
    }

    return { 
      message: 'Email verified successfully',
      email: user.email,
      userId: user.id
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const reminder = await this.prisma.reminders.findFirst({
      where: { code: dto.code, completed: false }
    });

    if (!reminder) throw new BadRequestException('Invalid or expired reset code');

    const hashed = await bcrypt.hash(dto.password, 10);

    // Update user password
    await this.prisma.users.update({
      where: { id: reminder.user_id },
      data: {
        password: hashed,
        updated_at: new Date()
      },
    });

    // Mark the reminder as completed
    await this.prisma.reminders.update({
      where: { id: reminder.id },
      data: {
        completed: true,
        completed_at: new Date(),
        updated_at: new Date(),
      }
    });

    return { message: 'Password updated successfully' };
  }

  async getProfile(userId : number) {
    const user = await this.prisma.users.findUnique({
      where : {id : userId},
      select: {
        id: true,
        email : true,
        first_name : true,
        last_name : true,
        phone : true,
        created_at : true,
      },
    });

    if(!user) throw new NotFoundException('User not exist');

    return user;
  }

  async getUserRole(userId: number) {
    const roles = await this.prisma.user_roles.findMany({
      where: { user_id: userId },
      include: {
        roles: {
          include: { role_translations: { where: { locale: 'en' } } },
        },
      },
    });
    return roles.map(ur => ({
      id: ur.roles.id,
      name: ur.roles.role_translations[0]?.name || 'Unknown',
    }));
  }

  // Method to check if user is admin
  async isAdmin(userId: number): Promise<boolean> {
    const userRoles = await this.prisma.user_roles.findMany({
      where: { user_id: userId },
      include: {
        roles: true
      }
    });

    return userRoles.some(ur =>
      ur.roles.permissions?.includes('admin') ||
      ur.roles.permissions?.includes('superadmin')
    );
  }

  // Method to get all pending activations (for admin use)
  async getPendingActivations(adminId: number) {
    const isAdmin = await this.isAdmin(adminId);
    if (!isAdmin) {
      throw new ForbiddenException('Only admins can view pending activations');
    }

    const pendingActivations = await this.prisma.activations.findMany({
      where: { completed: false },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            created_at: true,
          }
        }
      }
    });

    return pendingActivations.map(activation => ({
      id: activation.id,
      userId: activation.user_id,
      userEmail: activation.users.email,
      userFirstName: activation.users.first_name,
      userLastName: activation.users.last_name,
      createdAt: activation.created_at,
    }));
  }

  // Generate a refresh token and store it in the database
  async generateRefreshToken(userId: number): Promise<string> {
    // Generate a unique refresh token
    const refreshToken = this.generateUniqueToken();

    // Store the refresh token in the database
    await this.prisma.persistences.create({
      data: {
        user_id: userId,
        code: refreshToken,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return refreshToken;
  }

  // Verify a refresh token and return the associated user ID
  async verifyRefreshToken(refreshToken: string): Promise<number | null> {
    const persistence = await this.prisma.persistences.findUnique({
      where: { code: refreshToken },
    });

    if (!persistence) {
      return null;
    }

    return persistence.user_id;
  }

  // Remove a refresh token from the database
  async removeRefreshToken(refreshToken: string): Promise<void> {
    await this.prisma.persistences.deleteMany({
      where: { code: refreshToken },
    });
  }

  // Refresh access token using refresh token
  async refreshToken(dto: RefreshTokenDto) {
    const userId = await this.verifyRefreshToken(dto.refreshToken);

    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Get user details
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate new access token
    const payload = { sub: user.id, email: user.email };
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m';
    const options: JwtSignOptions = { expiresIn: expiresIn as any };
    const newAccessToken = this.jwtService.sign(payload, options);

    // Generate a new refresh token to rotate it
    const newRefreshToken = await this.generateRefreshToken(userId);

    // Remove the old refresh token
    await this.removeRefreshToken(dto.refreshToken);

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    };
  }

  private generateUniqueToken(): string {
    // Generate a random string as a refresh token
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }
}

export const generateSixDigitCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
