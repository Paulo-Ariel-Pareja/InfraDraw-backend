import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  port: Number(process.env.PORT) || 3000,
  secret: process.env.JWT_SECRET,
  expiration: process.env.JWT_EXPIRATION,
  userAdmin: process.env.USER_ADMIN,
  passAdmin: process.env.USER_PASSWORD,
}));
