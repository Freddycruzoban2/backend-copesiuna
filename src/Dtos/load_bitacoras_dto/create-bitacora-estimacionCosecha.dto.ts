import { Type } from "class-transformer";
import {
  IsInt,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsDate,
  IsArray,
} from "class-validator";

export class CreateBitacoraEstimacionCosechaDto {
  @IsString()
  @IsNotEmpty()
  estadoClima!: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  fecha_created!: Date;

  @IsNumber()
  @IsOptional()
  ID_parcela!: number;

  @IsNumber()
  @IsNotEmpty()
  ID_productor!: number;

  @IsNotEmpty()
  @Type(() => PlantaDto)
  plantas!: PlantaDto[];
}

export class PlantaDto {
  @IsNumber()
  @IsNotEmpty()
  numeroPlanta!: number;

  @IsOptional()
  @IsNumber()
  @IsArray()
  ID_afectacion!: number[];

  @IsOptional()
  @Type(() => MazorcaDto)
  mazorcas!: MazorcaDto[];
}

export class MazorcaDto {
  @IsOptional()
  @IsNumber()
  @IsArray()
  ID_afectacion!: number[];

  @IsNumber()
  @IsOptional()
  cantidad!: number;
}
