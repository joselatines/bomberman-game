import { Document } from 'mongoose';
import * as IGame from '../../interfaces/server/Interfaces';

export interface IServer extends Document {
  readonly name: string;

  readonly map: IGame.IMap;
  readonly players: [IGame.IPlayer];
  readonly chat: [IGame.IChat];
}
