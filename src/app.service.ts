import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello ${process.env.APP_NAME}!`;
  }
}
