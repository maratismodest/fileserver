import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as process from 'process';

import { UploadDto } from './dto/upload.dto';
import { UploadsService } from './uploads.service';
import { getExtension } from './uploads.utils';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Get(':filename')
  getFile(@Param('filename') filename, @Res() res) {
    return this.uploadsService.getFile(filename, res);
  }

  @Delete(':filename')
  removeFile(@Param() { filename }: UploadDto) {
    return this.uploadsService.deleteFile(filename);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          console.log('file', file);
          callback(null, `${Date.now()}.${getExtension(file.mimetype)}`);
        },
      }),
    }),
  )
  handleUpload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1000 }), //bytes
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      status: 'uploaded',
      link: `${process.env.SERVER_DOMAIN_URL}/uploads/${file.filename}`,
    };
  }
}
