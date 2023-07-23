import { Injectable } from '@nestjs/common';

interface IDate {
  name: string;
}

@Injectable()
export class PlayersService {
  playGame(): IDate {
    return {
      name: 'John',
    };
  }
}
