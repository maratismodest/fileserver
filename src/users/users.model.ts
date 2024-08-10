import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';

import { Ad } from '../ads/ads.model';
import { Ban } from '../ban/ban.model';

interface UserInterface {
  id: number;
  username: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserInterface> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({ example: 'username', description: 'Username' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @HasMany(() => Ad)
  userAd: Ad[];

  @HasOne(() => Ban)
  ban: Ban;
}
