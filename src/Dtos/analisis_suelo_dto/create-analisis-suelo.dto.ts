import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { AnalisisSuelo} from "../../entities";
import { Transform } from "class-transformer";

export class CreateAnalisisSuelo_dto extends AnalisisSuelo {
  @IsNumber()
  @IsNotEmpty()
  id_productor!: number;


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
