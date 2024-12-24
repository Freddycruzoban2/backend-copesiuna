import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { AnalisisSuelo, DetalleAnalisisSuelo} from "../../entities";
import { Transform } from "class-transformer";

export class CreateDetalleAnalisisSuelo_dto extends DetalleAnalisisSuelo {
  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  descripcion!: string;

  @IsNumber()
  @IsNotEmpty()
  id_analisis!: number;
}
