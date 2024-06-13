export function appConfig() {
  return {
    port: parseInt(process.env.PORT, 10),
    envirement: process.env.NODE_ENV || 'development',
    cookie: {
      secret: process.env.COOKIE_SECRET,
      maxAge: parseInt(process.env.COOKIE_MAX_AGE, 10),
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
      user: process.env.REDIS_USER,
      password: process.env.REDIS_PASSWORD,
    },
    database: {
      url: process.env.DATABASE_URL,
      type: process.env.DATABASE_TYPE,
    },
  };
}
