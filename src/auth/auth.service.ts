import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/users.schema';
import { Model, MongooseError } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async login(loginCredentials: LoginAuthDto) {
    const { email, password } = loginCredentials;
    const userFounded = await this.usersModel.findOne({ email });

    if (!userFounded) throw new HttpException('USER NOT FOUND', 404);
    const validPassword = await compare(password, userFounded.password);

    if (!validPassword) throw new HttpException('INCORRECT PASSWORD', 403);
    const payload = { id: userFounded._id, username: userFounded.username };

    const token = this.jwtService.sign(payload);

    const currentTime = new Date().getTime();
    const twoHours = 2 * 60 * 60 * 1000;
    const updatedTIme = new Date(currentTime + twoHours);

    return {
      data: userFounded,
      token,
      tokenExpiration: updatedTIme.toLocaleTimeString(),
    };
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
