import { Module } from '@nestjs/common';

import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { jwtModuleRegister } from '../utils/jwtModuleRegister';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  imports: [jwtModuleRegister],
  exports: [UploadsService],
})
export class UploadsModule {}
