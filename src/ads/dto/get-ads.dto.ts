import { ApiProperty } from '@nestjs/swagger';

export class GetAdsDto {
  @ApiProperty({
    description: 'User ID',
    minimum: 1,
    default: 1,
    required: false,
  })
  readonly userId?: number;

  @ApiProperty({
    description: 'Page number',
    minimum: 1,
    default: 1,
    required: false,
  })
  readonly page?: number;

  @ApiProperty({
    description: 'Page size',
    minimum: 1,
    default: 20,
    maximum: 1000,
    required: false,
  })
  readonly size?: number;

  @ApiProperty({
    description: 'The category ID',
    minimum: 1,
    default: 1,
    required: false,
  })
  readonly categoryId?: number;

  @ApiProperty({
    description: 'Minimum Price',
    minimum: 0,
    default: 0,
    required: false,
  })
  readonly min?: number;

  @ApiProperty({
    description: 'Maximum Price',
    minimum: 0,
    default: 100,
    required: false,
  })
  readonly max?: number;
}
