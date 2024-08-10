import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'slug', description: 'Slug' })
  @IsNotEmpty({ message: 'Slug required' })
  @IsString({ message: 'Slug is a string' })
  slug: string;

  @ApiProperty({ example: 'Title', description: 'Title' })
  @IsNotEmpty({ message: 'Title required' })
  @IsString({ message: 'Title is a string' })
  title: string;

  @ApiProperty({ example: 'Body', description: 'Body' })
  @IsNotEmpty({ message: 'Body required' })
  @IsString({ message: 'Body is a string' })
  body: string;
}
