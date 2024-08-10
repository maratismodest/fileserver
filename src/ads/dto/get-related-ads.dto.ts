import { ApiProperty } from '@nestjs/swagger';

export class GetRelatedAdsDto {
  @ApiProperty({
    description: 'The category ID',
    minimum: 1,
    default: 1,
    required: false,
  })
  readonly categoryId?: number;
}
