import { JwtModule } from '@nestjs/jwt';

const expiresIn = 60 * 60 * 24 * 365;

export const JwtModuleRegister = JwtModule.register({
  secret: `${process.env.JWT_PRIVATE_KEY}`,
  signOptions: {
    expiresIn: expiresIn,
  },
});
