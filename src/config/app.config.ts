import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  port: Number(process.env.PORT) || 3000,
  secret: process.env.JWT_SECRET,
  expiration: process.env.JWT_EXPIRATION,
  changePassword: process.env.URL_CHANGE_PASSWORD,
  recaptcha: process.env.RECAPTCHA,
  recaptchaApi: process.env.RECAPTCHA_API,
  recaptchaUseMock: Boolean(process.env.RECAPTCHA_USE_MOCK) || false,
}));
