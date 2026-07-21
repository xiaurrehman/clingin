import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
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
      throw new ForbiddenException('Only admins can create users');
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
      throw new ForbiddenException('Only admins can view all users');
    }
    return this.userService.findAll(adminId);
  }

  // ---- Static profile routes MUST come before :id ----

  @Get('profile/me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.userService.getProfile(req.user.sub);
  }

  @Patch('profile/me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.userService.updateProfile(req.user.sub, updateUserDto);
  }

  @Get('profile/me/roles')
  @UseGuards(JwtAuthGuard)
  async getUserRoles(@Request() req) {
    return this.userService.getUserRoles(req.user.sub);
  }

  @Get('profile/me/is-admin')
  @UseGuards(JwtAuthGuard)
  async checkIsAdmin(@Request() req) {
    const isAdmin = await this.userService.isAdmin(req.user.sub);
    return { isAdmin };
  }

  @Post('profile/me/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
    return this.userService.changePassword(req.user.sub, changePasswordDto);
  }

  @Post('assign-role')
  @UseGuards(JwtAuthGuard)
  async assignRole(@Body() assignRoleDto: AssignRoleDto, @Request() req) {
    const adminId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(adminId);
    if (!isAdmin) {
      throw new ForbiddenException('Only admins can assign roles');
    }
    return this.userService.assignRole(assignRoleDto.userId, assignRoleDto.roleId, adminId);
  }

  @Delete('remove-role/:userId/:roleId')
  @UseGuards(JwtAuthGuard)
  async removeRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
    @Request() req,
  ) {
    const adminId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(adminId);
    if (!isAdmin) {
      throw new ForbiddenException('Only admins can remove roles');
    }
    return this.userService.removeRole(+userId, +roleId, adminId);
  }

  // ---- Parametric routes last ----

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req) {
    const requestingUserId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(requestingUserId);
    return this.userService.findOne(+id, requestingUserId, isAdmin);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const requestingUserId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(requestingUserId);
    return this.userService.update(+id, updateUserDto, requestingUserId, isAdmin);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    const requestingUserId = req.user.sub;
    const isAdmin = await this.authService.isAdmin(requestingUserId);
    return this.userService.remove(+id, requestingUserId, isAdmin);
  }
}
