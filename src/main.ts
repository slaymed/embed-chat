import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as passport from 'passport';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { exceptionFactory } from './common/utils/exceptions-factory.util';
import { session } from './config/session.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(session(configService));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(configService.get('port'));
}
bootstrap();
