import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  email!: string;

  @MaxLength(50)
  @MinLength(2)
  @IsString()
  password!: string;
}
