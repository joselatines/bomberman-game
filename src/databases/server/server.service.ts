import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServerDto } from '../interfaces/create-server.dto';
import { JoinServerDto } from './dto/join-server.dto';
import { IServer } from '../interfaces/server.interfaces';
import { IPlayer } from '../../interfaces/server/Interfaces';

interface IMessage {
  msg: string;
}

@Injectable()
export class ServerService {
  constructor(
    @InjectModel('Server')
    private serverModel: Model<IServer>,
  ) {}

  async createServer(createServerDto: CreateServerDto): Promise<IServer> {
    const newServer = await new this.serverModel(createServerDto);
    return newServer.save();
  }

  async joinPlayer(joinServerDto: JoinServerDto): Promise<IMessage> {
    // const user = {name: joinServerDto.name, position: {x: position.x,y: position.y,},bomba: {power: 'string',position: {x: 'string',y: 'string',},time: new Date;}}
    try {
      const docs = await this.serverModel.findOne({
        name: joinServerDto.ServerName,
      });
      const players: [IPlayer] = docs.players;
      if (players.length >= 4) return { msg: 'Server full' };
      if (players.some((e) => e.name === joinServerDto.name))
        return {
          msg: `A user with the name of ${joinServerDto.name} already exists`,
        };

      const player: IPlayer = {
        name: joinServerDto.name,
        position: { x: -1, y: -1 },
        bomba: { power: '', position: { x: '0', y: '0' }, time: new Date() },
      };
      await docs.updateOne({ $push: { players: player } });

      return { msg: 'Join' };
    } catch (err) {
      console.error(err);
      throw new HttpException('ERROR SEARCH SERVER', 502);
    }
  }

  test(): void {
    console.log('yes');
  }
}
