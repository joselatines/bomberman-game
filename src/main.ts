import {ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {NestExpressApplication} from '@nestjs/platform-express'
import {join} from 'path'
import { MicroserviceOptions } from '@nestjs/microservices';

import {AppModule} from './app.module'
import config from './dotenv/config'

const bootstrap = async() => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'), {prefix : '/'});
  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  await app.listen(config.PORT);
  
}
bootstrap();
