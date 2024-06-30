import {
  Controller,
  Post,
  Body,
  Patch,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { CurrentUser } from 'src/utils/decorator/user.decorator';
import { UserDocument } from 'src/user/schema/user.schema';
import { SocialLoginDto } from './dto/social-login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Login successful.' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  login(@Body() loginAuthDto: LoginDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Signup successful.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/social-login')
  @ApiOperation({ summary: 'Social login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Login successful.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  socialLogin(@Body() socialLoginDto: SocialLoginDto) {
    return this.authService.socialLogin(socialLoginDto);
  }

  @Patch('change-password')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.authService.changePassword(changePasswordDto, user);
  }

  @Post('/forgot-password')
  @ApiOperation({ summary: 'Forgot password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset link sent to email.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return forgotPasswordDto;
    // return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset successful.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return resetPasswordDto;
    // return this.authService.resetPassword(resetPasswordDto);
  }
}
