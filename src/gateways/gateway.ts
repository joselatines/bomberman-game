import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connect', (socket) => {
      console.info(`Connected ${socket.id}`);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body) {
    console.info(body);

    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
}
