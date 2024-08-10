import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ArticlesControllers } from './articles.controllers';
import { Article } from './articles.model';
import { ArticlesService } from './articles.service';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesControllers],
  imports: [SequelizeModule.forFeature([Article])],
  exports: [ArticlesService],
})
export class ArticlesModule {}
