import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { jwtModuleRegister } from '../utils/jwtModuleRegister';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User]), jwtModuleRegister],
  exports: [UsersService],
})
export class UsersModule {}
