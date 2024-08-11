import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// const httpsOptions: HttpsOptions = {
//   key: fs.readFileSync(
//     '/etc/letsencrypt/live/fileserver.innoads.ru/privkey.pem',
//   ),
//   cert: fs.readFileSync(
//     '/etc/letsencrypt/live/fileserver.innoads.ru/fullchain.pem',
//   ),
//   ca: fs.readFileSync('/etc/letsencrypt/live/fileserver.innoads.ru/chain.pem'),
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    httpsOptions:
      process.env.NODE_ENV === 'production'
        ? ({
            key: fs.readFileSync(
              '/etc/letsencrypt/live/fileserver.innoads.ru/privkey.pem',
            ),
            cert: fs.readFileSync(
              '/etc/letsencrypt/live/fileserver.innoads.ru/fullchain.pem',
            ),
            ca: fs.readFileSync(
              '/etc/letsencrypt/live/fileserver.innoads.ru/chain.pem',
            ),
          } as HttpsOptions)
        : undefined,
  });
  // const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(`${process.env.APP_NAME} REST API`)
    .setExternalDoc(
      `${process.env.SERVER_DOMAIN_URL}/swagger.json`,
      '/api/docs-json',
    )
    .setVersion('1.0.4')
    // .addTag('InnoAds')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap().then(() =>
  console.log(`Server started on port = ${process.env.PORT}`),
);
