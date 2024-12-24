import { Type } from "class-transformer";
import {
  IsInt,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsDate,
} from "class-validator";

// export class CreateBitacoraEstimacionCosechaDto {
//   @IsString()
//   @IsNotEmpty()
//   estadoClima!: string;

//   @IsDate()
//   @Type(() => Date)
//   @IsNotEmpty()
//   fecha_created!: Date;

//   @IsNumber()
//   @IsNotEmpty()
//   ID_parcela!: number;

//   @IsNumber()
//   @IsNotEmpty()
//   ID_productor!: number;

//   @IsNumber()
//   @IsNotEmpty()
//   numeroPlanta!: number;

//   @IsNumber()
//   @IsOptional()
//   mazorcasSanas!: number;

//   @IsNumber()
//   @IsOptional()
//   mazorcasMonilia!: number;

//   @IsNumber()
//   @IsOptional()
//   mazorcasPhytophthora!: number;

//   @IsNumber()
//   @IsOptional()
//   mazorcasArdillas!: number;

//   @IsNumber()
//   @IsOptional()
//   mazorcasCuyus!: number;

//   @IsNumber()
//   @IsOptional()
//   mazorcasPajaro!: number;

//   @IsNumber()
//   @IsOptional()
//   mazorcasMonos!: number;

//   @IsNumber()
//   @IsOptional()
//   afectacionGallinaCiega_tecoron!: number;

//   @IsNumber()
//   @IsOptional()
//   afectacionAntracnosis!: number;

//   @IsNumber()
//   @IsOptional()
//   afectacionZompopos!: number;

//   @IsNumber()
//   @IsOptional()
//   afectacionComejen!: number;

//   @IsNumber()
//   @IsOptional()
//   afectacionChinche!: number;

//   @IsOptional()
//   @IsNumber()
//   afectacionMalMachete!: number;

//   @IsNumber()
//   @IsOptional()
//   afectacionGusano!: number;

//   @IsNumber()
//   @IsOptional()
//   afectacionHormiga!: number;

//   @IsNumber()
//   @IsNotEmpty()
//   totalMazorca!: number;
// }

export class CreateBitacoraEstimacionCosechaDto {
  @IsString()
  @IsNotEmpty()
  estadoClima!: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  fecha_created!: Date;

  @IsNumber()
  @IsNotEmpty()
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
  @Type(() => MazorcaDto)
  mazorcas!: MazorcaDto[];
}

export class MazorcaDto {
  @IsString()
  @IsNotEmpty()
  estado!: string; // "sana", "monilia", etc.

  @IsNumber()
  @IsOptional()
  cantidad!: number;
}
