import { Controller, Post, Body } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() userCredentials: LoginAuthDto) {
    return this.authService.login(userCredentials);
  }

  @Post('register')
  async registerUser(@Body() userCredentials: RegisterAuthDto) {
    return this.authService.register(userCredentials);
  }
}
