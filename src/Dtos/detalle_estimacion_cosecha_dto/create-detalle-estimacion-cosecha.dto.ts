import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { DetalleEstimacionCosecha} from "../../entities";
import { Transform } from "class-transformer";

export class CreateDetalleEstimacionCosecha_dto extends DetalleEstimacionCosecha {
  @IsString()
  @IsOptional()
  @Length(3, 40)
  descripcion!: string;

  @IsNumber()
  @IsOptional()
  @Length(3, 40)
  id_estimacion!: number;
}

