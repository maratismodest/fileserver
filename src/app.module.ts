import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UploadsModule } from './uploads/uploads.module';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModuleRegister } from './utils/jwtModuleRegister';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({ dest: './uploads' }),
    UploadsModule,
    JwtModuleRegister,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
