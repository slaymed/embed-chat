import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';

export class RegisterDto extends IntersectionType(CreateUserDto) {
  @IsOptional()
  @IsString()
  ifn?: string;
}
