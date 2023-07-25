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

const ServerNameToPlayers: IServerNameToPlayers = {};

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
    if (ServerNameToPlayers[body.ServerName] === undefined) {
      ServerNameToPlayers[body.ServerName] = {};
      ServerNameToPlayers[body.ServerName][body.id] = this.server;
    }
  }

  @SubscribeMessage('onMove')
  onMovePlayer(@MessageBody() body) {
    // this.DBService.test();
    // Object.values(ServerNameToPlayers[body.ServerName]).forEach((socket:Server) => {
    // socket.emit('onMovePlayer', { x: body.x, y: body.y, username: body.name});
    // })
  }
}
