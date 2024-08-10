import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 1234567, description: 'ID' })
  @IsInt({ message: 'Should be a number' })
  readonly id: number;

  @ApiProperty({ example: 'maratfaizer', description: 'Username' })
  @IsString({ message: 'Should be a string' })
  readonly username: string;
}
