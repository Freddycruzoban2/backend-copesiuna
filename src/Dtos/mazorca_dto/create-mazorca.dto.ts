import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from "class-validator";
import { Mazorca } from "../../entities";

export class CreateMazorca_dto extends Mazorca {
  @IsNumber()
  @IsNotEmpty()
  cantidad!: number;

  @IsString()
  @IsOptional()
  @MinLength(5)
  descripcion!: string;

  @IsNotEmpty()
  @IsNumber()
  id_afectacion!: number;

  @IsNotEmpty()
  @IsNumber()
  id_planta!: number;
}
