import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from 'src/user/schema/user.schema';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignUpDto } from './dto/signup.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { UserRole } from 'src/utils/enum/user.enum';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly i18n: I18nService,
    // private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUser({
      email: loginDto.email,
    });
    if (!user) {
      throw new BadRequestException(this.i18n.t('auth.NotRegistered'));
    }
    const isPassValid = await this.userService.comparePasswords(
      loginDto.password,
      user.password,
    );
    if (!isPassValid) {
      throw new BadRequestException(this.i18n.t('auth.InvalidPassword'));
    }
    return this.userService.loginUser(user);
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.create({
      ...signUpDto,
      role: UserRole.BusinessOwner,
    });
    return this.userService.loginUser(user);
  }

  async socialLogin(socialLoginDto: SocialLoginDto) {
    const name = socialLoginDto.name.split(' ');
    const user = await this.userService.create({
      firstName: name[0],
      lastName: name[1],
      email: socialLoginDto.email,
      role: UserRole.BusinessOwner,
    });
    return this.userService.loginUser(user);
  }

  changePassword(dto: ChangePasswordDto, user: UserDocument) {
    return this.userService.changePassword(dto, user);
  }
}
