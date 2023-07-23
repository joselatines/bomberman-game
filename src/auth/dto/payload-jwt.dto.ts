import { IsNotEmpty } from 'class-validator';

export class PayloadJWTDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  id: string;
}
