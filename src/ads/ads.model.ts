import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Category } from '../categories/categories.model';
import { User } from '../users/users.model';

export interface CreateAdAttrs {
  categoryId: number;
  title: string;
  description: string;
  price: number;
  preview: string;
  images: string;
  slug: string;
  userId: number;
}

@Table({ tableName: 'ads' })
export class Ad extends Model<Ad, CreateAdAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @ApiProperty({ example: 3000, description: 'Price' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @ApiProperty({ example: 'Rent a card', description: 'Title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'New one', description: 'Description' })
  @Column({ type: DataType.TEXT, allowNull: false })
  body: string;

  @ApiProperty({ example: 'https://someimage.jpg', description: 'Preview' })
  @Column({ type: DataType.STRING })
  preview: string;

  @ApiProperty({
    example: 'https://someimage.jpg||https://someimage2.jpg',
    description: 'Images',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  images: string;

  @ApiProperty({ example: 'https://innoads.ru/slug-123', description: 'Slug' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  slug: string;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 111, description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
