import { IsString } from 'class-validator';

export class UploadDto {
  @IsString()
  readonly filename: string;
}
