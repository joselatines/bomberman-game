import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: UsersService) {}

  @Post('login')
  async loginUser(@Body() userCredentials: LoginAuthDto) {
    const { password } = userCredentials;
    const hashedPassword = await hash('123', 10);
    const correctPassword = await compare(password, hashedPassword);

    if (!correctPassword) throw new HttpException('INCORRECT PASSWORD', 401);

    return password;
  }

  @Post('register')
  async registerUser(@Body() userCredentials: RegisterAuthDto) {
    const { password } = userCredentials;

    if (!password) throw new HttpException('PASSWORD NEEDED', 401);

    const hashedPassword = await hash(password, 10);

    return this.authService.create({
      ...userCredentials,
      password: hashedPassword,
    });
  }
}
