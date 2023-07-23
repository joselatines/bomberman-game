import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServerDto } from '../interfaces/create-server.dto';
import { IServer } from '../interfaces/server.interfaces';

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
}
