import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the admin.',
    example: 'drsignet@yopmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'Admin@1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
