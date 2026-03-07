import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // Admin endpoint to create user
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() createUserDto: CreateUserDto) {
    const adminId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(adminId);
    if (!isAdmin) {
      throw new Error('Only admins can create users');
    }
    return this.userService.create(createUserDto);
  }

  // Get all users (admin only)
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    const adminId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(adminId);
    if (!isAdmin) {
      throw new Error('Only admins can view all users');
    }
    return this.userService.findAll(adminId);
  }

  // Get specific user (admin can access any user, regular user can access only their own)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req) {
    const requestingUserId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(requestingUserId);
    return this.userService.findOne(+id, requestingUserId, isAdmin);
  }

  // Update user (admin can update any user, regular user can update only their own)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    const requestingUserId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(requestingUserId);
    return this.userService.update(+id, updateUserDto, requestingUserId, isAdmin);
  }

  // Delete user (admin only)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    const requestingUserId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(requestingUserId);
    return this.userService.remove(+id, requestingUserId, isAdmin);
  }

  // Get current user's profile
  @Get('profile/me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    return this.userService.getProfile(userId);
  }

  // Update current user's profile
  @Patch('profile/me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    const userId = req.user.sub;
    return this.userService.updateProfile(userId, updateUserDto);
  }

  // Get current user's roles
  @Get('profile/me/roles')
  @UseGuards(JwtAuthGuard)
  async getUserRoles(@Request() req) {
    const userId = req.user.sub;
    return this.userService.getUserRoles(userId);
  }

  // Assign role to user (admin only)
  @Post('assign-role')
  @UseGuards(JwtAuthGuard)
  async assignRole(@Body() assignRoleDto: AssignRoleDto, @Request() req) {
    const adminId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(adminId);
    if (!isAdmin) {
      throw new Error('Only admins can assign roles');
    }
    return this.userService.assignRole(assignRoleDto.userId, assignRoleDto.roleId, adminId);
  }

  // Remove role from user (admin only)
  @Delete('remove-role/:userId/:roleId')
  @UseGuards(JwtAuthGuard)
  async removeRole(@Param('userId') userId: string, @Param('roleId') roleId: string, @Request() req) {
    const adminId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(adminId);
    if (!isAdmin) {
      throw new Error('Only admins can remove roles');
    }
    return this.userService.removeRole(+userId, +roleId, adminId);
  }

  // Check if current user is admin
  @Get('profile/me/is-admin')
  @UseGuards(JwtAuthGuard)
  async checkIsAdmin(@Request() req) {
    const userId = req.user.sub;
    const isAdmin = await this.userService.isAdmin(userId);
    return { isAdmin };
  }

  // Change password (requires current password verification)
  @Post('profile/me/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
    const userId = req.user.sub;
    return this.userService.changePassword(userId, changePasswordDto);
  }
}
