import { Injectable } from '@nestjs/common';
import { HashingService } from 'src/hashing/hashing.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOne({
      where: { email },
    });
    if (user && this.hashingService.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  login(user: User, request: Request): Promise<User | Error> {
    return new Promise((resolve, reject) => {
      request.login(user, (err) => {
        if (err) reject(err);
        else resolve(user);
      });
    });
  }

  logout(request: Request): Promise<Error | { message: string }> {
    return new Promise((resolve, reject) => {
      request.logout((err) => {
        if (err) return reject(err);
        request.session.destroy((err) => {
          if (err) return reject(err);
          resolve({ message: 'Logged out successfully' });
        });
      });
    });
  }
}
