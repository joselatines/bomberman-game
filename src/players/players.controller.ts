import { Controller, Get } from '@nestjs/common';

import { PlayersService } from './players.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get()
  Game(): any {
    return this.playersService.playGame();
  }
}
