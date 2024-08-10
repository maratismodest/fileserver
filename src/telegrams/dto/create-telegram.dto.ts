import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateTelegramPostDto {
  @ApiProperty({ example: 'Macbook Air M13', description: 'Title' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Refurbished', description: 'Body' })
  @IsString()
  @MaxLength(800)
  readonly body: string;

  @ApiProperty({ example: 30000, description: 'Price' })
  @IsInt()
  readonly price: number;

  @ApiProperty({ example: 'telegram-slug-123', description: 'Slug' })
  @IsString()
  readonly slug: string;

  @ApiProperty({ example: 'username', description: 'Username' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 1, description: 'CategoryId' })
  @IsInt()
  readonly categoryId: number;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'Images',
  })
  @IsString()
  readonly images: string;
}
