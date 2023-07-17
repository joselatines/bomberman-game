import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth/sign-up')
export class SignUpController {
  @Post()
  signUp(@Body() userCredentials: any) {
    return 'sign up';
  }
}
