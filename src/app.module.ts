import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UploadsModule } from './uploads/uploads.module';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({ dest: './uploads' }),
    UploadsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_PRIVATE_KEY,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
