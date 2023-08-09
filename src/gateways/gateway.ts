import { OnModuleInit, Inject } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { ServerService } from '../databases/server/server.service';

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

      this.server.to(socket.id).emit('onConnect', { id: socket.id });
    });
  }

  @SubscribeMessage('onConnectServer')
  onConnectServer(@MessageBody() body) {
    (globalThis.ServerNameToPlayers[body.ServerName] ?? []).forEach(
      async (id: string) => {
        this.server.to(id).emit('onJoinPlayer', body);
      },
    );

    if (globalThis.ServerNameToPlayers[body.ServerName] === undefined)
      globalThis.ServerNameToPlayers[body.ServerName] = [];

    globalThis.ServerNameToPlayers[body.ServerName].push(body.id);
  }

  @SubscribeMessage('onMove')
  onMovePlayer(@MessageBody() body) {
    (globalThis.ServerNameToPlayers[body.ServerName] ?? []).forEach(
      (id: string) => {
        this.server.to(id).emit('onPlayerMove', {
          positionPlayer: body.positionPlayer,
          x: body.x,
          y: body.y,
        });
      },
    );
    this.DBService.uploadData(body);
  }
}
