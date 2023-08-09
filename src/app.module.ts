import { Module } from '@nestjs/common';
import { ServerModule } from './databases/server/server.module';
import { GatewaysModule } from './gateways/gateways.module';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GatewaysModule, AuthModule, UsersModule, ServerModule],

  controllers: [PlayersController],
  providers: [PlayersService],
})
export class AppModule {}
