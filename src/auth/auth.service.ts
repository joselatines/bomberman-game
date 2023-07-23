import { Injectable, HttpException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/users.schema';
import { Model, MongooseError } from 'mongoose';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}
  async login(loginCredentials: LoginAuthDto) {
    const { email, password } = loginCredentials;
    const userFounded = await this.usersModel.findOne({ email });

    if (!userFounded) throw new HttpException('USER NOT FOUND', 401);
    const validPassword = await compare(password, userFounded.password);

    if (!validPassword) throw new HttpException('INCORRECT PASSWORD', 401);

    return userFounded;
  }

  async register(registerCredentials: RegisterAuthDto) {
    try {
      const userCreated = await this.usersModel.create(registerCredentials);
      console.log({ userCreated });

      return userCreated;
    } catch (error) {
      const mongooseError = error as MongooseError;

      throw new HttpException(mongooseError.message, 400);
    }
  }
}
