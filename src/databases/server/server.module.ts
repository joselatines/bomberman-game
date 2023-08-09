import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../../dotenv/config';
import { ServerSchema } from '../schema/server.schema';

const MONGO_URI = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster.vaqcv.mongodb.net`;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI, { dbName: config.DB_COLLECTION }),
    MongooseModule.forFeature([{ name: 'Server', schema: ServerSchema }]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [ServerService],
})
export class ServerModule {}
