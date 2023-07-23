import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerSchema } from './databases/schema/server.schema';
import { ServerController } from './databases/server/server.controller';
import { ServerService } from './databases/server/server.service';
import config from './dotenv/config';
import { GatewaysModule } from './gateways/gateways.module';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const MONGO_URI = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster.vaqcv.mongodb.net`;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI, { dbName: config.DB_COLLECTION }),
    MongooseModule.forFeature([{ name: 'Server', schema: ServerSchema }]),
    ConfigModule.forRoot({ isGlobal: true }),
    GatewaysModule,
    AuthModule,
    UsersModule,
  ],

  controllers: [PlayersController, ServerController],
  providers: [PlayersService, ServerService],
})
export class AppModule {}
