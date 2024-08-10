import { ValidationPipe } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

import { AppModule } from './app.module';

const httpsOptions: HttpsOptions = {
  key: fs.readFileSync(
    '/etc/letsencrypt/live/fileserver.innoads.ru/privkey.pem',
  ),
  cert: fs.readFileSync(
    '/etc/letsencrypt/live/fileserver.innoads.ru/fullchain.pem',
  ),
  ca: fs.readFileSync('/etc/letsencrypt/live/fileserver.innoads.ru/chain.pem'),
};

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });
  // const app = await NestFactory.create(AppModule, { cors: true });
  // const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(`${process.env.APP_NAME} REST API`)
    .setExternalDoc(
      `${process.env.SERVER_DOMAIN_URL}/swagger.json`,
      '/api/docs-json',
    )
    .setVersion('1.0.3')
    // .addTag('InnoAds')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT);
}

bootstrap().then(() => console.log(`Server started on port = ${PORT}`));
