import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from "class-validator";
import { AnalisisSuelo, EstimacionCosecha } from "../../entities";
import { Transform } from "class-transformer";

export class CreateEstimacionCosecha_dto extends EstimacionCosecha {
  @IsNumber()
  @IsNotEmpty()
  id_parcela!: number;

  @IsDate()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsOptional()
  fecha_levantamiento!: Date;

  @IsDate()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsOptional()
  fecha_e_laboratorio!: Date;

  @IsString()
  @IsOptional()
  @Length(3, 40)
  descripcion!: string;
}
