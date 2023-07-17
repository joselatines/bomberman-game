import { Controller, Post, Body } from '@nestjs/common';
import { UserToLog } from './login.entity';

@Controller('auth/login')
export class LoginController {
  @Post()
  login(@Body() user: UserToLog) {
    return user;
  }
}
