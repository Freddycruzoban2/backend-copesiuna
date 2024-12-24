import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from "class-validator";
import { AsignacionTP } from "../../entities";
import { Transform } from "class-transformer";
import { TipoAsignacion } from "../../common/enum/tipo-asignacion.role";

export class CreateAsignacionTP_dto extends AsignacionTP {
  @IsNumber()
  @IsNotEmpty()
  ID_productor!: number;

  @IsNumber()
  @IsNotEmpty()
  ID_user!: number;

  @IsEnum(TipoAsignacion, {
    message: `El valor del role proporcionado no es válido. Debe ser ${TipoAsignacion.ESTIMACION_COSECHA} o ${TipoAsignacion.ANALISIS_FISICO_CLINICO}.`,
  })
  @IsNotEmpty()
  tipo!: TipoAsignacion;

  @IsOptional()
  @IsBoolean()
  estado!: boolean;
}
