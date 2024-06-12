import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { RequestUser } from 'src/user/decorators/request-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { HashingService } from 'src/hashing/hashing.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@RequestUser() user: User) {
    return user;
  }

  @Post('register')
  async register(@Body() dto: RegisterDto, @Req() req: Request) {
    const createdUser = await this.userService.create({
      ...dto,
      password: this.hashingService.hash(dto.password),
    });

    return this.authService.login(createdUser, req);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  profile(@RequestUser() user: User) {
    return user;
  }
}
