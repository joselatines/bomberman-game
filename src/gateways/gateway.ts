import { OnModuleInit, Inject } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { ServerService } from '../databases/server/server.service';

interface IContent {
  [index: string]: Server;
}

interface IServerNameToPlayers {
  [index: string]: IContent;
}

globalThis.ServerNameToPlayers = {};

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  constructor(
    @Inject(ServerService) private readonly DBService: ServerService,
  ) {}
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connect', (socket) => {
      console.info(`Connected ${socket.id}`);

      this.server.emit('onConnect', { id: socket.id });
    });
  }

  @SubscribeMessage('onConnectServer')
  onConnectServer(@MessageBody() body) {
    (globalThis.ServerNameToPlayers[body.ServerName]??[]).forEach(async(socket:Server) => {
      socket.emit('onJoinPlayer', body);
    })

    if (globalThis.ServerNameToPlayers[body.ServerName] === undefined)
      globalThis.ServerNameToPlayers[body.ServerName] = [];

    globalThis.ServerNameToPlayers[body.ServerName].push(this.server);
  }

  @SubscribeMessage('onMove')
  async onMovePlayer(@MessageBody() body) {
    globalThis.ServerNameToPlayers[body.ServerName].forEach((socket:Server, i:number) => {
      socket.emit('onPlayerMove', {positionPlayer: body.positionPlayer, x: body.x, y: body.y});
    });
    // await this.DBService.uploadData(body);
  }
}
