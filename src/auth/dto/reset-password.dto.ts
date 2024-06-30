import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description:
      'New password for the user. Must be different from the old password and contain at least one uppercase letter, one number, and one special character.',
    example: 'NewPass123$',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  new_password: string;

  @ApiProperty({
    description:
      'Confirmation of the new password. Must match the new password exactly.',
    example: 'NewPass123$',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  confirm_password: string;
}
