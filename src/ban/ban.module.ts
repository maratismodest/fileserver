import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { jwtModuleRegister } from '../utils/jwtModuleRegister';
import { BanControllers } from './ban.controllers';
import { Ban } from './ban.model';
import { BanService } from './ban.service';

@Module({
  providers: [BanService],
  controllers: [BanControllers],
  imports: [SequelizeModule.forFeature([Ban]), jwtModuleRegister],
  exports: [BanService],
})
export class BanModule {}
