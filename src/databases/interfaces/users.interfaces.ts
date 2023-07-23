import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly gender: 'male' | 'female';
  readonly friends: [{ name: string; email: string }];
}
