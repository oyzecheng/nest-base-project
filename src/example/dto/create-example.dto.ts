import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateExampleDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
