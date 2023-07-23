import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

import * as IGame from '../../interfaces/server/Interfaces';

@Schema()
export class Server {
  @Prop() name: string;

  @Prop({type : mongoose.Schema.Types.Mixed}) map: IGame.map;

  @Prop() players: Array<IGame.player>;

  @Prop() chat: Array<IGame.chat>;
}

export const ServerSchema = SchemaFactory.createForClass(Server);
