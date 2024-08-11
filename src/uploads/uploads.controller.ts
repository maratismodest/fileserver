import {
  Controller,
  Delete,
  Get,
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
import { getExtension, validators } from './uploads.utils';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Get(':project/:filename')
  getFile(
    @Param('project') project: string,
    @Param('filename') filename: string,
    @Res() res,
  ) {
    // return `Fetching file ${filename} from project ${project}`;
    return this.uploadsService.getFileByProject(project, filename, res);
  }

  @Delete(':project/:filename')
  removeFile(@Param() { project, filename }: UploadDto) {
    return this.uploadsService.deleteFile(project, filename);
  }

  @Post(':project')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const project = req.params.project;
          callback(null, `./uploads/${project}`);
        },
        filename: (req, file, callback) => {
          console.log('file', file);
          callback(null, `${Date.now()}.${getExtension(file.mimetype)}`);
        },
      }),
    }),
  )
  handleUpload(
    @Param('project') project: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: validators,
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      status: 'uploaded',
      link: `${process.env.SERVER_DOMAIN_URL}/uploads/${project}/${file.filename}`,
    };
  }
}
