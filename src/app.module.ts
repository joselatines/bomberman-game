import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ServerSchema} from './databases/schema/server.schema';
import {ServerController} from './databases/server/server.controller';
import {ServerService} from './databases/server/server.service';
import config from './dotenv/config';
import {PlayersController} from './players/players.controller';
import { ConfigModule } from '@nestjs/config';
import {PlayersService} from './players/players.service';
import { SocketIoClient } from './socket-io/socket-io-client/socket-io-client.provider';
import { SocketIoClientProxyService } from './socket-io/socket-io-client-proxy/socket-io-client-proxy.service';
import { SocketIoListenerController } from './socket-io/socket-io-listener/socket-io-listener.controller';

@Module({
  imports : [
    MongooseModule.forRoot(`mongodb+srv://${config.DB_USER}:${
                               config.DB_PASSWORD}@cluster.vaqcv.mongodb.net`,
                           {dbName : config.DB_COLLECTION}),
    MongooseModule.forFeature([ {name : 'Server', schema : ServerSchema} ]),
    ConfigModule.forRoot({isGlobal: true})
  ],

  controllers : [ AppController, PlayersController, ServerController, SocketIoListenerController ],
  providers : [ AppService, PlayersService, ServerService, SocketIoClient, SocketIoClientProxyService ],
})

export class AppModule {
}
