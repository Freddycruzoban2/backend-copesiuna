import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { AnalisisSuelo, PropiedadesSuelo} from "../../entities";
import { Transform } from "class-transformer";

export class CreatePropiedadesSuelo_dto extends PropiedadesSuelo {
  @IsString()
  @IsNotEmpty()
  nombre!: string;


  @IsString()
  @IsNotEmpty()
  datos!: string;

  @IsNumber()
  @IsNotEmpty()
  id_analisis_suelo!: number;
}
