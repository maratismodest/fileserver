import { Injectable, Res } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UploadsService {
  getFile(filename: string, @Res() res) {
    return res.sendFile(filename, { root: './uploads' });
  }

  getAudio(filename: string, @Res() res) {
    return res.sendFile(filename, { root: './uploads/audio' });
  }

  deleteFile(filename: string) {
    fs.unlinkSync(`./uploads/${filename}`);
    return { status: 'deleted' };
  }
}
