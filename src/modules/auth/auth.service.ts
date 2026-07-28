import { BadRequestException, Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AccountOpeningDto } from './dto/account-opening.dto';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
  ) { }

  async signup(dto: SignupDto) {
    const existing = await this.prisma.users.findUnique({
      where: { email: dto.email },
      include: {
        account_openings: { select: { id: true, status: true } },
        activations: {
          select: { id: true, completed: true },
          orderBy: { created_at: 'desc' },
          take: 1,
        },
      },
    });

    if (existing) {
      const openingStatus = existing.account_openings?.status;
      const isActivated =
        existing.activations?.[0]?.completed === true ||
        openingStatus === 'activated';

      if (isActivated) {
        throw new BadRequestException(
          'An account with this email already exists. Please sign in.',
        );
      }

      if (openingStatus === 'pending') {
        throw new BadRequestException(
          'An application with this email is already pending admin approval.',
        );
      }

      if (openingStatus === 'rejected') {
        return this.reapplyAfterRejection(existing.id, dto);
      }

      // Existing user without a clear rejected opening — block duplicate signup
      throw new BadRequestException('Email already exist');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const opening = dto.accountOpening;

    const user = await this.prisma.users.create({
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
        email: dto.email,
        password: hashed,
        phone: dto.phone || opening?.telephone || '',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    await this.upsertUserProfileFromSignup(user.id, dto);
    await this.persistAccountOpening(user.id, dto, { create: true });
    await this.resetPendingActivation(user.id);

    this.notifyAdminOfNewApplication({
      userId: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone || undefined,
      companyName: opening?.companyName,
      customerType: opening?.customerType,
    }).catch((error) => {
      console.error('Failed to send admin new-application email:', error);
    });

    return {
      message: opening
        ? 'Account application submitted successfully. Pending admin approval'
        : 'User created successfully. Pending admin approval',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      hasAccountOpening: Boolean(opening),
    };
  }

  /** Rejected applicants may submit again with the same email. */
  private async reapplyAfterRejection(userId: number, dto: SignupDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const opening = dto.accountOpening;

    const user = await this.prisma.users.update({
      where: { id: userId },
      data: {
        first_name: dto.firstName,
        last_name: dto.lastName,
        password: hashed,
        phone: dto.phone || opening?.telephone || '',
        updated_at: new Date(),
      },
    });

    await this.upsertUserProfileFromSignup(user.id, dto);
    await this.persistAccountOpening(user.id, dto, { create: false });
    await this.resetPendingActivation(user.id);

    this.notifyAdminOfNewApplication({
      userId: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone || undefined,
      companyName: opening?.companyName,
      customerType: opening?.customerType,
    }).catch((error) => {
      console.error('Failed to send admin new-application email:', error);
    });

    return {
      message:
        'Account application resubmitted successfully. Pending admin approval',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      hasAccountOpening: Boolean(opening),
      resubmitted: true,
    };
  }

  private async upsertUserProfileFromSignup(userId: number, dto: SignupDto) {
    const opening = dto.accountOpening;
    const jobRole =
      dto.jobRole ||
      (opening?.customerType === 'wholesale'
        ? 'Wholesale customer'
        : opening?.customerType === 'clinic'
          ? 'Doctor / pharmacy / dentist'
          : undefined);
    const licenseNumber =
      dto.licenseNumber || opening?.wdaNo || opening?.licenseRegNo;
    const instituteName = dto.instituteName || opening?.companyName;
    const addressLine1 = dto.addressLine1 || opening?.registeredAddress;
    const townCity = dto.townCity || opening?.tradingName || opening?.companyName;
    const country = dto.country || 'United Kingdom';
    const extension = dto.extension;

    if (
      !(
        jobRole ||
        licenseNumber ||
        extension ||
        instituteName ||
        addressLine1 ||
        townCity ||
        country
      )
    ) {
      return;
    }

    try {
      await this.prisma.user_profiles.upsert({
        where: { user_id: userId },
        create: {
          user_id: userId,
          job_role: jobRole,
          license_number: licenseNumber,
          extension,
          institute_name: instituteName,
          address_line_1: addressLine1,
          town_city: townCity,
          country,
          created_at: new Date(),
          updated_at: new Date(),
        },
        update: {
          job_role: jobRole,
          license_number: licenseNumber,
          extension,
          institute_name: instituteName,
          address_line_1: addressLine1,
          town_city: townCity,
          country,
          updated_at: new Date(),
        },
      });
    } catch (profileError) {
      console.error('Failed to upsert user profile:', profileError);
    }
  }

  private async persistAccountOpening(
    userId: number,
    dto: SignupDto,
    opts: { create: boolean },
  ) {
    const opening = dto.accountOpening;
    if (!opening) return;

    const personnel =
      opening.personnel ||
      (opening.director ||
      opening.rp ||
      opening.finance ||
      opening.purchase ||
      opening.warehouse
        ? {
            director: opening.director,
            rp: opening.rp,
            finance: opening.finance,
            purchase: opening.purchase,
            warehouse: opening.warehouse,
          }
        : null);

    let declDate: Date | null = null;
    if (opening.declDate) {
      const parsed = new Date(opening.declDate);
      if (!Number.isNaN(parsed.getTime())) {
        declDate = parsed;
      }
    }

    const data = {
      customer_type: opening.customerType,
      status: 'pending' as const,
      rejected_at: null,
      rejection_reason: null,
      company_name: opening.companyName,
      trading_name: opening.tradingName || null,
      registered_address: opening.registeredAddress,
      warehouse_address: opening.warehouseAddress || null,
      telephone: opening.telephone || dto.phone || null,
      website: opening.website || null,
      company_house_no: opening.companyHouseNo || null,
      vat_no: opening.vatNo || null,
      wda_no: opening.wdaNo || null,
      gdp_cert_no: opening.gdpCertNo || null,
      gdp_answers:
        opening.gdpAnswers != null
          ? (opening.gdpAnswers as Prisma.InputJsonValue)
          : undefined,
      license_reg_no: opening.licenseRegNo || null,
      cqc_reg_no: opening.cqcRegNo || null,
      cqc_address: opening.cqcAddress || null,
      personnel:
        personnel != null
          ? (JSON.parse(JSON.stringify(personnel)) as Prisma.InputJsonValue)
          : undefined,
      bank_name: opening.bankName || null,
      sort_code: opening.sortCode || null,
      bank_address: opening.bankAddress || null,
      account_no: opening.accountNo || null,
      confirm_accurate: Boolean(opening.confirmAccurate),
      confirm_consent: Boolean(opening.confirmConsent),
      decl_name: opening.declName || null,
      decl_position: opening.declPosition || null,
      decl_sign: opening.declSign || null,
      decl_date: declDate,
      updated_at: new Date(),
    };

    try {
      if (opts.create) {
        await this.prisma.account_openings.create({
          data: {
            user_id: userId,
            ...data,
            created_at: new Date(),
          },
        });
      } else {
        await this.prisma.account_openings.update({
          where: { user_id: userId },
          data,
        });
      }
    } catch (openingError) {
      console.error('Failed to persist account opening record:', openingError);
      if (!opts.create) {
        throw new BadRequestException(
          'Could not resubmit the previous application. Please contact support.',
        );
      }
    }
  }

  private async resetPendingActivation(userId: number) {
    await this.prisma.activations.deleteMany({
      where: { user_id: userId },
    });

    await this.prisma.activations.create({
      data: {
        user_id: userId,
        code: generateSixDigitCode(),
        completed: false,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
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

    // Mark the HALO application as activated
    await this.prisma.account_openings.updateMany({
      where: { user_id: userId },
      data: {
        status: 'activated',
        rejected_at: null,
        rejection_reason: null,
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

  /** Admin: reject a pending account opening application */
  async rejectAccountByAdmin(
    userId: number,
    adminId: number,
    reason?: string,
  ) {
    if (!(await this.isAdmin(adminId))) {
      throw new ForbiddenException('Only admins can reject accounts');
    }

    const rejectionReason = reason?.trim();
    if (!rejectionReason) {
      throw new BadRequestException(
        'Please provide a reason for rejecting this application. The applicant will receive it by email.',
      );
    }

    const opening = await this.prisma.account_openings.findUnique({
      where: { user_id: userId },
    });

    if (!opening) {
      throw new NotFoundException('Account application not found for this user');
    }

    if (opening.status === 'activated') {
      throw new BadRequestException('Activated accounts cannot be rejected');
    }

    if (opening.status === 'rejected') {
      throw new BadRequestException('Application is already rejected');
    }

    const updated = await this.prisma.account_openings.update({
      where: { id: opening.id },
      data: {
        status: 'rejected',
        rejected_at: new Date(),
        rejection_reason: rejectionReason,
        updated_at: new Date(),
      },
    });

    // Keep activation incomplete so the user cannot sign in
    await this.prisma.activations.updateMany({
      where: { user_id: userId, completed: false },
      data: { updated_at: new Date() },
    });

    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (user) {
      try {
        await this.mailService.sendAccountRejectedNotification(
          user.email,
          rejectionReason,
        );
      } catch (error) {
        console.error('Failed to send rejection email:', error);
        // Rejection still stands even if email delivery fails
      }
    }

    return {
      message: 'Application rejected successfully. The applicant has been emailed the reason.',
      application: {
        id: updated.id,
        userId,
        status: updated.status,
        rejectedAt: updated.rejected_at,
        rejectionReason: updated.rejection_reason,
      },
    };
  }

  // Alternative method: Allow activation with code (for initial setup or special cases)
  async activateAccountWithCode(_dto: ActivateAccountDto) {
    // Self-serve email activation is disabled — only admins can approve accounts
    throw new BadRequestException(
      'Email activation is not available. Your application must be approved by an administrator before you can sign in.',
    );
  }

  // Resend activation code
  async resendActivationCode(_email: string) {
    throw new BadRequestException(
      'Activation codes are not sent by email. Please wait for an administrator to approve your application.',
    );
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.users.findUnique({ where: { email: dto.email } });
    if (!user) throw new BadRequestException('Invalid email');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new BadRequestException('Incorrect Password');

    const opening = await this.prisma.account_openings.findUnique({
      where: { user_id: user.id },
      select: { status: true },
    });

    if (opening?.status === 'rejected') {
      throw new UnauthorizedException(
        'Your account application was rejected. Please contact support.',
      );
    }

    if (opening?.status === 'pending') {
      throw new UnauthorizedException(
        'Your account application is pending admin approval. You will be able to sign in once it is approved.',
      );
    }

    // Check if account is activated (covers users without an opening record)
    const activation = await this.prisma.activations.findFirst({
      where: { user_id: user.id },
    });

    if (activation && !activation.completed) {
      throw new UnauthorizedException(
        'Your account is pending admin approval. You will be able to sign in once it is approved.',
      );
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

  /** Resolve store admin inbox (same source as order notifications). */
  private async resolveAdminEmail(): Promise<string | null> {
    const fromEnv =
      this.configService.get<string>('ADMIN_EMAIL') ||
      this.configService.get<string>('STORE_EMAIL');
    if (fromEnv?.trim()) return fromEnv.trim();

    const adminSetting = await this.prisma.settings.findUnique({
      where: { key: 'store_email' },
    });
    if (!adminSetting?.plain_value) return null;

    let adminEmail = adminSetting.plain_value;
    const phpSerializedMatch = adminSetting.plain_value.match(/s:\d+:"([^"]+)"/);
    if (phpSerializedMatch) {
      adminEmail = phpSerializedMatch[1];
    }
    return adminEmail?.trim() || null;
  }

  private async notifyAdminOfNewApplication(details: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    companyName?: string;
    customerType?: string;
  }): Promise<void> {
    const adminEmail = await this.resolveAdminEmail();
    if (!adminEmail) {
      console.warn(
        'No admin email configured (ADMIN_EMAIL / store_email); skipped new-application notification',
      );
      return;
    }

    await this.mailService.sendAdminNewAccountApplicationNotification(adminEmail, {
      applicantName: `${details.firstName} ${details.lastName}`.trim(),
      applicantEmail: details.email,
      phone: details.phone,
      companyName: details.companyName,
      customerType: details.customerType,
      userId: details.userId,
    });
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

  /** Customer: get own HALO account opening application */
  async getMyAccountOpening(userId: number) {
    const row = await this.prisma.account_openings.findUnique({
      where: { user_id: userId },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            phone: true,
            created_at: true,
            activations: {
              select: {
                id: true,
                completed: true,
                completed_at: true,
                created_at: true,
              },
              orderBy: { created_at: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    // No application yet (legacy users / incomplete signup) — not an error
    if (!row) {
      return null;
    }

    return this.mapAccountOpening(row);
  }

  /** Customer: update own HALO account opening details */
  async updateMyAccountOpening(userId: number, dto: AccountOpeningDto) {
    const existing = await this.prisma.account_openings.findUnique({
      where: { user_id: userId },
    });

    if (!existing) {
      throw new NotFoundException('No account application found for this user');
    }

    // Keep original customer type — users cannot switch wholesale ↔ clinic
    const customerType = existing.customer_type as 'wholesale' | 'clinic';

    const personnel =
      dto.personnel ||
      (dto.director || dto.rp || dto.finance || dto.purchase || dto.warehouse
        ? {
            director: dto.director,
            rp: dto.rp,
            finance: dto.finance,
            purchase: dto.purchase,
            warehouse: dto.warehouse,
          }
        : null);

    let declDate: Date | null = null;
    if (dto.declDate) {
      const parsed = new Date(dto.declDate);
      if (!Number.isNaN(parsed.getTime())) {
        declDate = parsed;
      }
    }

    const updated = await this.prisma.account_openings.update({
      where: { id: existing.id },
      data: {
        company_name: dto.companyName,
        trading_name: dto.tradingName || null,
        registered_address: dto.registeredAddress,
        warehouse_address: dto.warehouseAddress || null,
        telephone: dto.telephone || null,
        website: dto.website || null,
        company_house_no: dto.companyHouseNo || null,
        vat_no: dto.vatNo || null,
        wda_no: customerType === 'wholesale' ? dto.wdaNo || null : null,
        gdp_cert_no: customerType === 'wholesale' ? dto.gdpCertNo || null : null,
        gdp_answers:
          customerType === 'wholesale' && dto.gdpAnswers != null
            ? (dto.gdpAnswers as Prisma.InputJsonValue)
            : existing.gdp_answers ?? undefined,
        license_reg_no: customerType === 'clinic' ? dto.licenseRegNo || null : null,
        cqc_reg_no: customerType === 'clinic' ? dto.cqcRegNo || null : null,
        cqc_address: customerType === 'clinic' ? dto.cqcAddress || null : null,
        personnel:
          personnel != null
            ? (JSON.parse(JSON.stringify(personnel)) as Prisma.InputJsonValue)
            : undefined,
        bank_name: dto.bankName || null,
        sort_code: dto.sortCode || null,
        bank_address: dto.bankAddress || null,
        account_no: dto.accountNo || null,
        confirm_accurate:
          dto.confirmAccurate != null
            ? Boolean(dto.confirmAccurate)
            : existing.confirm_accurate,
        confirm_consent:
          dto.confirmConsent != null
            ? Boolean(dto.confirmConsent)
            : existing.confirm_consent,
        decl_name: dto.declName || null,
        decl_position: dto.declPosition || null,
        decl_sign: dto.declSign || null,
        decl_date: declDate ?? existing.decl_date,
        updated_at: new Date(),
      },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            phone: true,
            created_at: true,
            activations: {
              select: {
                id: true,
                completed: true,
                completed_at: true,
                created_at: true,
              },
              orderBy: { created_at: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    // Keep legacy user_profiles in sync with company details
    try {
      await this.prisma.user_profiles.update({
        where: { user_id: userId },
        data: {
          institute_name: dto.companyName,
          address_line_1: dto.registeredAddress,
          license_number:
            customerType === 'wholesale'
              ? dto.wdaNo || null
              : dto.licenseRegNo || null,
          updated_at: new Date(),
        },
      });
    } catch (profileError) {
      console.error('Failed to sync user profile from account opening:', profileError);
    }

    if (dto.telephone) {
      await this.prisma.users.update({
        where: { id: userId },
        data: { phone: dto.telephone, updated_at: new Date() },
      });
    }

    return this.mapAccountOpening(updated);
  }

  /** Admin: list all HALO account opening applications */
  async getAccountOpenings(adminId: number, customerType?: string) {
    if (!(await this.isAdmin(adminId))) {
      throw new ForbiddenException('Only admins can view account applications');
    }

    const where =
      customerType === 'wholesale' || customerType === 'clinic'
        ? { customer_type: customerType }
        : {};

    const rows = await this.prisma.account_openings.findMany({
      where,
      include: {
        users: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            phone: true,
            created_at: true,
            activations: {
              select: {
                id: true,
                completed: true,
                completed_at: true,
                created_at: true,
              },
              orderBy: { created_at: 'desc' },
              take: 1,
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return rows.map((row) => this.mapAccountOpening(row));
  }

  /** Admin: single account opening application with full detail */
  async getAccountOpeningById(adminId: number, id: number) {
    if (!(await this.isAdmin(adminId))) {
      throw new ForbiddenException('Only admins can view account applications');
    }

    const row = await this.prisma.account_openings.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            phone: true,
            created_at: true,
            activations: {
              select: {
                id: true,
                completed: true,
                completed_at: true,
                created_at: true,
              },
              orderBy: { created_at: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    if (!row) {
      throw new NotFoundException('Account application not found');
    }

    return this.mapAccountOpening(row);
  }

  /** Admin: delete a HALO account opening application */
  async deleteAccountOpening(adminId: number, id: number) {
    if (!(await this.isAdmin(adminId))) {
      throw new ForbiddenException('Only admins can delete account applications');
    }

    const row = await this.prisma.account_openings.findUnique({
      where: { id },
      select: { id: true, user_id: true, company_name: true },
    });

    if (!row) {
      throw new NotFoundException('Account application not found');
    }

    await this.prisma.account_openings.delete({
      where: { id: row.id },
    });

    return {
      message: 'Account application deleted successfully',
      id: row.id,
      userId: row.user_id,
      companyName: row.company_name,
    };
  }

  private mapAccountOpening(row: any) {
    const activation = row.users?.activations?.[0] ?? null;
    const activationCompleted = activation ? Boolean(activation.completed) : false;
    let status: 'pending' | 'activated' | 'rejected' =
      row.status === 'rejected' || row.status === 'activated' || row.status === 'pending'
        ? row.status
        : 'pending';

    // Keep status in sync with activation for older rows
    if (status !== 'rejected' && activationCompleted) {
      status = 'activated';
    }

    return {
      id: row.id,
      userId: row.user_id,
      customerType: row.customer_type,
      status,
      rejectedAt: row.rejected_at ?? null,
      rejectionReason: row.rejection_reason ?? null,
      company: {
        companyName: row.company_name,
        tradingName: row.trading_name,
        registeredAddress: row.registered_address,
        warehouseAddress: row.warehouse_address,
        telephone: row.telephone,
        website: row.website,
        companyHouseNo: row.company_house_no,
        vatNo: row.vat_no,
      },
      wholesale:
        row.customer_type === 'wholesale'
          ? {
              wdaNo: row.wda_no,
              gdpCertNo: row.gdp_cert_no,
              gdpAnswers: row.gdp_answers ?? {},
            }
          : null,
      clinic:
        row.customer_type === 'clinic'
          ? {
              licenseRegNo: row.license_reg_no,
              cqcRegNo: row.cqc_reg_no,
              cqcAddress: row.cqc_address,
            }
          : null,
      personnel: row.personnel ?? null,
      bank: {
        bankName: row.bank_name,
        sortCode: row.sort_code,
        bankAddress: row.bank_address,
        accountNo: row.account_no,
      },
      declaration: {
        confirmAccurate: row.confirm_accurate,
        confirmConsent: row.confirm_consent,
        declName: row.decl_name,
        declPosition: row.decl_position,
        declSign: row.decl_sign,
        declDate: row.decl_date,
      },
      login: {
        userId: row.users?.id,
        email: row.users?.email,
        firstName: row.users?.first_name,
        lastName: row.users?.last_name,
        phone: row.users?.phone,
        registeredAt: row.users?.created_at,
        accountActivated: activationCompleted,
        activationCompletedAt: activation?.completed_at ?? null,
      },
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
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
