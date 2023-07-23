import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() userCredentials: LoginAuthDto) {
   
    return this.authService.login(userCredentials);
  }

  @Post('register')
  async registerUser(@Body() userCredentials: RegisterAuthDto) {
    const { password } = userCredentials;

    if (!password) throw new HttpException('PASSWORD NEEDED', 403);

    const hashedPassword = await hash(password, 10);

    return this.authService.register({
      ...userCredentials,
      password: hashedPassword,
    });
  }
}
