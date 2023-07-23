import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

@Injectable()
export class UsersService {
  create(UserDto: RegisterAuthDto) {
    return UserDto;
  }
}
