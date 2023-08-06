import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServerDto } from '../interfaces/create-server.dto';
import { JoinServerDto } from './dto/join-server.dto';
import { IServer } from '../interfaces/server.interfaces';
import { IPlayer } from '../../interfaces/server/Interfaces';
import { Server } from 'socket.io';

interface IMessage {
  msg: string;
  position: number | undefined;
}

@Injectable()
export class ServerService {
  constructor(
    @InjectModel('Server')
    private serverModel: Model<IServer>,
  ) {
    this.watch();
  }

  async createServer(createServerDto: CreateServerDto): Promise<IServer> {
    const newServer = await new this.serverModel(createServerDto);
    return newServer.save();
  }

  async joinPlayer(joinServerDto: JoinServerDto): Promise<IMessage> {
    try {
      const docs = await this.serverModel.findOne({
        name: joinServerDto.ServerName,
      });
      const players: [IPlayer] = docs.players;
      if (players.length >= 20) return { msg: 'Server full', position: undefined };
      if (players.some((e) => e.name === joinServerDto.name))
        return {
          msg: `A user with the name of ${joinServerDto.name} already exists`,
          position: undefined
        };

      const x = players.length >= 1 && players.length <= 2?1106:58;
      const y = players.length >= 2 && players.length <= 3?711:58;

      const player: IPlayer = {
        name: joinServerDto.name,
        position: { x, y },
        bomba: { power: '', position: { x: '0', y: '0' }, time: new Date() },
      };
      await docs.updateOne({ $push: { players: player } });

      return { msg: 'Join', position: players.length};
    } catch (err) {
      console.error(err);
      throw new HttpException('ERROR SEARCH SERVER', 502);
    }
  }

  async uploadData(body) {
    const result = await this.serverModel.findOneAndUpdate(
      { name: body.ServerName, 'players.name': body.name },
      { $set: { 'players.$.position': { x: body.x, y: body.y } } },
      { new: true }
    );
  }

  watch() {
    this.serverModel.watch([], { fullDocument: 'updateLookup' }).on('change', (data) => {
      if(globalThis.ServerNameToPlayers[data.fullDocument.name] === undefined) return;

      const update = data.updateDescription.updatedFields;

      const updatedFields = Object.keys(update).map((e, i) => {
        return [e, Object.values(update)[i]];
      });

      globalThis.ServerNameToPlayers[data.fullDocument.name].forEach((socket:Server, i:number) => {
        socket.emit('onPlayer', updatedFields);
      });

    })
  }

}
