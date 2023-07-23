import {ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {NestExpressApplication} from '@nestjs/platform-express'
import {join} from 'path'
import { MicroserviceOptions } from '@nestjs/microservices';

import {AppModule} from './app.module'
import config from './dotenv/config'

import { SocketIoClientStrategy } from './socket-io/socket-io-client/socket-io-client.strategy';
import { SocketIoClient } from './socket-io/socket-io-client/socket-io-client.provider';
import * as io from 'socket.io';

const bootstrap = async() => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const socketIoClientProvider = app.get<SocketIoClient>(
    SocketIoClient,
  );

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new SocketIoClientStrategy((new SocketIoClient).getSocket()),
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  
  app.useStaticAssets(join(__dirname, '..', 'public'), {prefix : '/'});
  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  await app.listen(config.PORT);
  
}
bootstrap();
