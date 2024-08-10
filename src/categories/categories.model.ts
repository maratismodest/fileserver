import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { Ad } from '../ads/ads.model';

interface CreateCategoryAttrs {
  id: number;
  name: string;
  label: string;
  image: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CreateCategoryAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Sell', description: 'Category' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @ApiProperty({ example: 'Продам', description: 'User sees it' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  label: string;

  @ApiProperty({
    example: 'https://chamala.tatar/uploads/buy.png',
    description: 'Image Url',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @HasMany(() => Ad)
  userAd: Ad[];
}
