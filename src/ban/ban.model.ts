import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '../users/users.model';

export interface CreateBanAttrs {
  userId: number;
  description?: string;
}

@Table({ tableName: 'ban' })
export class Ban extends Model<Ban, CreateBanAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Bad boy!', description: 'Description' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 71233480, description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  userId: number;
}
