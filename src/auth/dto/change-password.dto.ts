import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password of the user.',
    example: 'OldPass123!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).*)/, {
    message: 'Password too weak',
  })
  oldPassword: string;

  @ApiProperty({
    description:
      'New password for the user. Must be different from the old password and contain at least one uppercase letter, one number, and one special character.',
    example: 'NewPass123$',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).*)/, {
    message: 'Password too weak',
  })
  newPassword: string;
}
