import { UserRole } from 'src/utils/enum/user.enum';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRole;
}
