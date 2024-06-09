import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { HashingModule } from 'src/hashing/hashing.module';
import { SessionSerializer } from './serializers/session.serializer';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    HashingModule,
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, SessionSerializer],
})
export class AuthModule {}
