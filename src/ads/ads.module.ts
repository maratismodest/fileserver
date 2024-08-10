import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { jwtModuleRegister } from '../utils/jwtModuleRegister';
import { AdsControllers } from './ads.controllers';
import { Ad } from './ads.model';
import { AdsService } from './ads.service';

@Module({
  providers: [AdsService],
  controllers: [AdsControllers],
  imports: [SequelizeModule.forFeature([Ad]), jwtModuleRegister],
  exports: [AdsService],
})
export class AdsModule {}
