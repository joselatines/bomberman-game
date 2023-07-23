import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength
} from "class-validator";

export class CreateServerDto {
  @IsString() readonly name: string;

  @IsObject()
  readonly map: {
    block_destroy: Array<{x : number, y: number}>,
    block_solid: Array<{x : number, y: number}>
  };

  @IsArray()
  readonly players: Array<{
    name : string,
    position: {
      x: number,
      y: number,
    },
    bomba: {
      power: string,
      position: {
        x: string,
        y: string,
      },
      time: Date,
    },
  }>;

  @IsArray()
  readonly chat: Array<{
    msg : string,
    name: string,
  }>;
}
