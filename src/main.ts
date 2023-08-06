import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';
import config from './dotenv/config';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // api documentation
  const docsConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Bomberman Game')
    .setDescription('The bomberman game created with ❤️ with nest js')
    .setVersion('1.0')
    .addTag('players')
    .addTag('users')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/' });
  app.setViewEngine('ejs');

  await app.listen(config.PORT);

  console.info('✨Server running in', config.PORT);
};
bootstrap();
