import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { SocketIoClient } from '../socket-io-client/socket-io-client.provider';

@Injectable()
export class SocketIoClientProxyService extends ClientProxy {
  @Inject(SocketIoClient)
  private client: SocketIoClient;

  async connect(): Promise<any> {
    this.client.getSocket();
    console.log('connect client proxy');
  }

  async close() {
    this.client.getSocket().disconnect();
    console.log('connect client proxy');
  }

  /**
   * this method use when you use SocketIoClientProxyService.emit
   * @param packet
   * @returns
   */
  async dispatchEvent(packet: ReadPacket<any>): Promise<any> {
    this.client.getSocket().emit(packet.pattern, packet.data);
    return;
  }

  /**
   * this method will be call when use SocketIoClientProxyService.send
   * can be use to implement request-response
   * @param packet
   * @param callback
   * @returns
   */
  publish(packet: ReadPacket<any>, callback: (packet: WritePacket<any>) => void): any {
    console.log('message:', packet);
    setTimeout(() => callback({ response: packet.data }), 5000);
    return (() => console.log('teardown'));
  }

}