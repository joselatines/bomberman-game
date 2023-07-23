import {OnModuleInit} from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import {Server} from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connect',
                   (socket) => { console.log(`Connected ${socket.id}`); })
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body) {
    console.log(body);

    this.server.emit('onMessage', {
      msg : 'New Message',
      content : body,
    })
  }
}
