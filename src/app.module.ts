import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ServerSchema} from './databases/schema/server.schema';
import {ServerController} from './databases/server/server.controller';
import {ServerService} from './databases/server/server.service';
import config from './dotenv/config';
import {GatewaysModule} from './gateways/gateways.module';
import {PlayersController} from './players/players.controller';
import {PlayersService} from './players/players.service';

@Module({
  imports : [
    MongooseModule.forRoot(`mongodb+srv://${config.DB_USER}:${
                               config.DB_PASSWORD}@cluster.vaqcv.mongodb.net`,
                           {dbName : config.DB_COLLECTION}),
    MongooseModule.forFeature([ {name : 'Server', schema : ServerSchema} ]),
    ConfigModule.forRoot({isGlobal : true}), GatewaysModule
  ],

  controllers : [ PlayersController, ServerController ],
  providers : [ PlayersService, ServerService ],
})

export class AppModule {
}
