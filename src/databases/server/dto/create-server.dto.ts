import { IsNotEmpty, Length } from 'class-validator';

export class CreateServerDto {
  @IsNotEmpty()
  @Length(4, 12)
  name: string;
}
