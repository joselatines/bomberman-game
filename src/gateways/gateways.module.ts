import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { ServerModule } from '../databases/server/server.module';

// @Module({ providers: [MyGateway] })

@Module({
  imports: [ServerModule],
  providers: [MyGateway],
})
export class GatewaysModule {}
