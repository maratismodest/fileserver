import { Injectable } from '@nestjs/common';
import * as process from 'process';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello ${process.env.APP_NAME}!`;
  }
}
