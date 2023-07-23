import { Document } from 'mongoose';
import * as IGame from '../../interfaces/server/Interfaces';

export interface IServer extends Document {
  readonly name: string;

  readonly map: IGame.map;
  readonly players: [IGame.player];
  readonly chat: [IGame.chat];
}
