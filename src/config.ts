import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      dbUser: process.env.DB_USER,
      dbPassword: process.env.DB_PASS,
      dbHost: process.env.DB_HOST,
      dbPort: parseInt(process.env.DB_PORT, 10),
      dbName: process.env.DB_NAME
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    jwtRefreshExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  };
});
