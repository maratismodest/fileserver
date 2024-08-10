import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAdDto {
  @ApiProperty({ example: 1234567, description: 'UserId' })
  @IsNotEmpty({ message: 'user id required' })
  @IsInt({ message: 'user id is a number' })
  readonly categoryId: number;

  @ApiProperty({ example: 3000, description: 'Price' })
  @IsNotEmpty({ message: 'price required' })
  @IsInt({ message: 'price is a number' })
  readonly price: number;

  @ApiProperty({ example: 'Rent a car', description: 'Title' })
  @IsNotEmpty({ message: 'title required' })
  readonly title: string;

  @ApiProperty({ example: 'New one', description: 'Description' })
  @IsNotEmpty({ message: 'description required' })
  readonly body: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'Preview',
  })
  @IsNotEmpty({ message: 'preview required' })
  readonly preview: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'Images',
  })
  @IsNotEmpty({ message: 'images required' })
  readonly images: string;

  @ApiProperty({ example: 'slug-123', description: 'Slug' })
  @IsNotEmpty({ message: 'slug required' })
  readonly slug: string;

  @ApiProperty({ example: 1234567, description: 'UserId' })
  @IsNotEmpty({ message: 'User id required' })
  @IsInt({ message: 'User id is a number' })
  readonly userId: number;
}
