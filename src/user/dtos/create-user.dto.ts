import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { UserRole } from '../enums/role.enum';

export class CreateUserDto {
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;

  @IsEnum(UserRole, { message: 'Invalid user role' })
  role: UserRole;

  @IsString()
  @IsStrongPassword()
  password: string;
}
