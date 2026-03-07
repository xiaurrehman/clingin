import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.prisma.users.findUnique({
      where: { email: createUserDto.email }
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create the user
    const user = await this.prisma.users.create({
      data: {
        first_name: createUserDto.firstName,
        last_name: createUserDto.lastName,
        email: createUserDto.email,
        phone: createUserDto.phone || '',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      }
    });

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(adminId: number) {
    // Verify admin privileges
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
      throw new UnauthorizedException('Only admins can view all users');
    }

    const users = await this.prisma.users.findMany({
      include: {
        user_roles: {
          include: {
            roles: {
              include: {
                role_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        roles: user.user_roles.map(ur => ({
          id: ur.roles.id,
          name: ur.roles.role_translations[0]?.name || 'Unknown Role',
          permissions: ur.roles.permissions
        }))
      };
    });
  }

  async findOne(id: number, requestingUserId: number, isAdmin: boolean = false) {
    // If user is not admin, only allow access to their own profile
    if (!isAdmin && requestingUserId !== id) {
      throw new UnauthorizedException('You can only access your own profile');
    }

    const user = await this.prisma.users.findUnique({
      where: { id },
      include: {
        user_roles: {
          include: {
            roles: {
              include: {
                role_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      roles: user.user_roles.map(ur => ({
        id: ur.roles.id,
        name: ur.roles.role_translations[0]?.name || 'Unknown Role',
        permissions: ur.roles.permissions
      }))
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto, requestingUserId: number, isAdmin: boolean = false) {
    // If user is not admin, only allow updating their own profile
    if (!isAdmin && requestingUserId !== id) {
      throw new UnauthorizedException('You can only update your own profile');
    }

    // Check if user exists
    const existingUser = await this.prisma.users.findUnique({
      where: { id }
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Check if email is being updated and if it's already taken by another user
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.prisma.users.findUnique({
        where: { email: updateUserDto.email }
      });

      if (emailExists) {
        throw new BadRequestException('Email already taken by another user');
      }
    }

    // Prepare update data
    const updateData: any = {
      updated_at: new Date(),
    };

    if (updateUserDto.firstName !== undefined) updateData.first_name = updateUserDto.firstName;
    if (updateUserDto.lastName !== undefined) updateData.last_name = updateUserDto.lastName;
    if (updateUserDto.email !== undefined) updateData.email = updateUserDto.email;
    if (updateUserDto.phone !== undefined) updateData.phone = updateUserDto.phone;

    // Update password if provided
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: updateData
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return {
      message: 'User updated successfully',
      user: userWithoutPassword
    };
  }

  async remove(id: number, requestingUserId: number, isAdmin: boolean = false) {
    // Only admins can delete users
    if (!isAdmin) {
      throw new UnauthorizedException('Only admins can delete users');
    }

    // Check if user exists
    const existingUser = await this.prisma.users.findUnique({
      where: { id }
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Prevent deletion of own account
    if (requestingUserId === id) {
      throw new BadRequestException('You cannot delete your own account');
    }

    // Delete related records first (due to foreign key constraints)
    await this.prisma.user_roles.deleteMany({
      where: { user_id: id }
    });

    await this.prisma.activations.deleteMany({
      where: { user_id: id }
    });

    await this.prisma.addresses.deleteMany({
      where: { customer_id: id }
    });

    await this.prisma.default_addresses.deleteMany({
      where: { customer_id: id }
    });

    await this.prisma.reminders.deleteMany({
      where: { user_id: id }
    });

    await this.prisma.wish_lists.deleteMany({
      where: { user_id: id }
    });

    // Delete the user
    await this.prisma.users.delete({
      where: { id }
    });

    return { message: 'User deleted successfully' };
  }

  // Get user profile (for authenticated users to get their own profile)
  async getProfile(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      include: {
        user_roles: {
          include: {
            roles: {
              include: {
                role_translations: {
                  where: { locale: 'en' },
                  take: 1
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      roles: user.user_roles.map(ur => ({
        id: ur.roles.id,
        name: ur.roles.role_translations[0]?.name || 'Unknown Role',
        permissions: ur.roles.permissions
      }))
    };
  }

  // Update user profile (for authenticated users to update their own profile)
  async updateProfile(userId: number, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const existingUser = await this.prisma.users.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Check if email is being updated and if it's already taken by another user
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.prisma.users.findUnique({
        where: { email: updateUserDto.email }
      });

      if (emailExists) {
        throw new BadRequestException('Email already taken by another user');
      }
    }

    // Prepare update data
    const updateData: any = {
      updated_at: new Date(),
    };

    if (updateUserDto.firstName !== undefined) updateData.first_name = updateUserDto.firstName;
    if (updateUserDto.lastName !== undefined) updateData.last_name = updateUserDto.lastName;
    if (updateUserDto.email !== undefined) updateData.email = updateUserDto.email;
    if (updateUserDto.phone !== undefined) updateData.phone = updateUserDto.phone;

    // Update password if provided
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.prisma.users.update({
      where: { id: userId },
      data: updateData
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return {
      message: 'Profile updated successfully',
      user: userWithoutPassword
    };
  }

  // Get user role information
  async getUserRoles(userId: number) {
    const userRoles = await this.prisma.user_roles.findMany({
      where: { user_id: userId },
      include: {
        roles: {
          include: {
            role_translations: {
              where: { locale: 'en' },
              take: 1
            }
          }
        }
      }
    });

    return userRoles.map(ur => ({
      id: ur.roles.id,
      name: ur.roles.role_translations[0]?.name || 'Unknown Role',
      permissions: ur.roles.permissions
    }));
  }

  // Assign role to user (admin only)
  async assignRole(userId: number, roleId: number, adminId: number) {
    // Verify admin privileges
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
      throw new UnauthorizedException('Only admins can assign roles');
    }

    // Check if user and role exist
    const [user, role] = await Promise.all([
      this.prisma.users.findUnique({ where: { id: userId } }),
      this.prisma.roles.findUnique({ where: { id: roleId } })
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Check if role is already assigned
    const existingUserRole = await this.prisma.user_roles.findUnique({
      where: {
        user_id_role_id: {
          user_id: userId,
          role_id: roleId
        }
      }
    });

    if (existingUserRole) {
      throw new BadRequestException('Role already assigned to user');
    }

    // Assign the role
    await this.prisma.user_roles.create({
      data: {
        user_id: userId,
        role_id: roleId,
        created_at: new Date(),
        updated_at: new Date(),
      }
    });

    return { message: 'Role assigned successfully' };
  }

  // Remove role from user (admin only)
  async removeRole(userId: number, roleId: number, adminId: number) {
    // Verify admin privileges
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
      throw new UnauthorizedException('Only admins can remove roles');
    }

    // Check if user and role exist
    const [user, role] = await Promise.all([
      this.prisma.users.findUnique({ where: { id: userId } }),
      this.prisma.roles.findUnique({ where: { id: roleId } })
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Check if role is assigned to user
    const existingUserRole = await this.prisma.user_roles.findUnique({
      where: {
        user_id_role_id: {
          user_id: userId,
          role_id: roleId
        }
      }
    });

    if (!existingUserRole) {
      throw new BadRequestException('Role not assigned to user');
    }

    // Remove the role
    await this.prisma.user_roles.delete({
      where: {
        user_id_role_id: {
          user_id: userId,
          role_id: roleId
        }
      }
    });

    return { message: 'Role removed successfully' };
  }

  // Check if user is admin
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

  // Change password (requires current password verification)
  async changePassword(userId: number, dto: ChangePasswordDto) {
    // Find the user
    const user = await this.prisma.users.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.users.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        updated_at: new Date()
      }
    });

    return { message: 'Password changed successfully' };
  }
}
