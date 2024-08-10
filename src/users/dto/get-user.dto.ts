import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({ example: 1234567, description: 'ID' })
  readonly id: number;
}
