import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';

import { Ad } from './ads/ads.model';
import { AdsModule } from './ads/ads.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article } from './articles/articles.model';
import { ArticlesModule } from './articles/articles.module';
import { Ban } from './ban/ban.model';
import { BanModule } from './ban/ban.module';
import { Category } from './categories/categories.model';
import { CategoriesModule } from './categories/categories.module';
import { TelegramsModule } from './telegrams/telegrams.module';
import { UploadsModule } from './uploads/uploads.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MulterModule.register({ dest: './uploads' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Ad, Category, Article, Ban],
      autoLoadModels: true,
    }),
    SequelizeModule.forFeature([User, Ad, Category, Article, Ban]),
    UsersModule,
    AdsModule,
    CategoriesModule,
    UploadsModule,
    TelegramsModule,
    ArticlesModule,
    BanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
