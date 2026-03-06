import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyResetEmailDto } from './dto/verify-reset-email.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ---------- SIGNUP ----------
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  // ---------- SIGNIN ----------
  @Post('signin')
  async signin(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.signin(signinDto);

    // ✅ ACCESS TOKEN COOKIE
    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      sameSite: 'lax', // 🔥 required for cross-origin
      secure: false,    // true in production (HTTPS)
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // ✅ OPTIONAL REFRESH TOKEN COOKIE
    if (tokens.refresh_token) {
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    return {
      message: 'Signin successful',
    };
  }

  // ---------- ACCOUNT ACTIVATION ----------
  @Post('activate-account')
  async activateAccount(@Body() activateAccountDto: ActivateAccountDto) {
    return this.authService.activateAccountWithCode(activateAccountDto);
  }

  @Post('activate-account-by-admin')
  @UseGuards(JwtAuthGuard)
  async activateAccountByAdmin(@Body('userId') userId: number, @Request() req) {
    const adminId = req.user.sub;
    return this.authService.activateAccountByAdmin(userId, adminId);
  }

  @Post('resend-activation-code')
  async resendActivationCode(@Body('email') email: string) {
    return this.authService.resendActivationCode(email);
  }

  // ---------- PASSWORD ----------
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgotPasswordDto);
  }

  @Post('verify-reset-email')
  async verifyResetEmail(@Body() verifyResetEmailDto: VerifyResetEmailDto) {
    return this.authService.verifyResetEmail(
      verifyResetEmailDto.email,
      verifyResetEmailDto.code
    );
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  // ---------- PROFILE ----------
  @Get('pending-activations')
  @UseGuards(JwtAuthGuard)
  async getPendingActivations(@Request() req) {
    return this.authService.getPendingActivations(req.user.sub);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }

  @Get('role')
  @UseGuards(JwtAuthGuard)
  async getUserRole(@Request() req) {
    return this.authService.getUserRole(req.user.sub);
  }

  // ---------- REFRESH ----------
  @Post('refresh')
  async refresh(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refresh_token;
    const tokens = await this.authService.refreshToken(refreshToken);

    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: 'Token refreshed' };
  }

  // ---------- LOGOUT ----------
  @Post('logout')
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;

    if (refreshToken) {
      await this.authService.removeRefreshToken(refreshToken);
    }

    // ✅ CLEAR COOKIES
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return { message: 'Logged out successfully' };
  }
}
