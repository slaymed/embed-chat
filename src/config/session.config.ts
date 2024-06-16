import * as SessionFactory from 'express-session';
import RedisStore from 'connect-redis';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

export function session(configService: ConfigService) {
  const prod = configService.get('envirement') === 'production';
  const cookie = configService.get('cookie');
  const redis = configService.get('redis');

  return SessionFactory({
    secret: cookie.secret,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      client: new Redis({
        host: redis.host,
        port: redis.port,
      }),
    }),
    cookie: {
      secure: prod || 'auto',
      sameSite: prod ? 'none' : 'lax',
      maxAge: cookie.maxAge,
      httpOnly: true,
    },
  });
}
