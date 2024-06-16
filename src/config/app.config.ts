import { toNumber } from 'src/common/utils/transformer.util';

export function appConfig() {
  return {
    port: toNumber(process.env.PORT),
    envirement: process.env.NODE_ENV,
    cookie: {
      secret: process.env.COOKIE_SECRET,
      maxAge: toNumber(process.env.COOKIE_MAX_AGE),
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: toNumber(process.env.REDIS_PORT),
      user: process.env.REDIS_USER,
      password: process.env.REDIS_PASSWORD,
    },
    database: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: toNumber(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
  };
}
