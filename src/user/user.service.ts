import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { I18nService } from 'nestjs-i18n';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ChangeUserPasswordDto } from './dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto, parentUser?: UserDocument) {
    const isEmailExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (isEmailExist) {
      throw new ConflictException(this.i18n.t('user.MailExists'));
    }

    const newUser = new this.userModel({
      ...createUserDto,
    });
    if (createUserDto.password) {
      newUser.password = await this.hashPassword(createUserDto.password);
    }

    if (parentUser) {
      newUser.createdBy = parentUser;
    }
    return await newUser.save();
  }

  async findAll() {
    const users = await this.userModel.find({});
    return { users };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(this.i18n.t('user.NotFound'));
    }
    return user;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.userModel.findByIdAndDelete(id);
    return this.i18n.t('user.UserDeleted');
  }

  async changePassword(
    changePasswordDto: ChangeUserPasswordDto,
    u: UserDocument,
  ) {
    console.log('u', u);
    const user = await this.userModel.findById(u.id);

    const isPassValid = await this.comparePasswords(
      changePasswordDto.oldPassword,
      user.password,
    );
    if (!isPassValid) {
      throw new BadRequestException(this.i18n.t('user.InvalidOldPassword'));
    }
    user.password = await this.hashPassword(changePasswordDto.newPassword);
    await user.save();
    return this.i18n.t('user.PasswordUpdated');
  }

  getUser(where: FilterQuery<User>) {
    return this.userModel.findOne(where);
  }

  async loginUser(user: UserDocument) {
    user.lastLogin = new Date();
    await user.save();
    const accessToken = this.getJwtAccessToken(user.email);

    return { accessToken, user: this.filterReturnFields(user) };
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, storedPasswordHash);
  }

  private getJwtAccessToken(email: string) {
    return this.jwtService.sign({ email });
  }

  private filterReturnFields(user: UserDocument) {
    const restFields = user.toJSON();
    delete restFields.password;
    return restFields;
  }
}
