import { IntersectionType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';

export class RegisterDto extends IntersectionType(CreateUserDto) {}
