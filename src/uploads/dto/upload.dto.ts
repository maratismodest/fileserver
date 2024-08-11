import { IsString } from 'class-validator';

export class UploadDto {
  @IsString()
  readonly project: string;

  @IsString()
  readonly filename: string;
}
