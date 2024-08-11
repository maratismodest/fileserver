import { Injectable, Res } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UploadsService {
  getFileByProject(project: string, filename: string, @Res() res) {
    return res.sendFile(filename, { root: `./uploads/${project}` });
  }

  deleteFile(project: string, filename: string) {
    fs.unlinkSync(`./uploads/${project}/${filename}`);
    return { message: 'deleted', status: 200 };
  }
}
