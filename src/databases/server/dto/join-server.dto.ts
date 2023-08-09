import { IsNotEmpty, Length } from 'class-validator';

export class JoinServerDto {
  @IsNotEmpty()
  @Length(4, 12)
  name: string;

  @IsNotEmpty()
  @Length(4, 12)
  ServerName: string;
}
