import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CreateArticleAttrs {
  title: string;
  slug: string;
  body: string;
}

@Table({ tableName: 'articles' })
export class Article extends Model<Article, CreateArticleAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'article-slug-123', description: 'Slug' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  slug: string;

  @ApiProperty({ example: 'Title', description: 'Title' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;

  @ApiProperty({ example: '<h1>Hello world</h1>', description: 'Body' })
  @Column({ type: DataType.TEXT, allowNull: false })
  body: string;
}
