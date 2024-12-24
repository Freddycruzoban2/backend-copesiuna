import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  MinLength,
  IsNumber,
  IsJSON,
  IsDate,
} from "class-validator";

export class ProductorDto {
  @IsNumber()
  @IsOptional()
  id!: number | null;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  direccion!: string;

  @IsString()
  @IsNotEmpty()
  cedula!: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  fecha_create!: Date;

  @IsString()
  @Type(() => Date)
  @IsOptional()
  fecha_update!: Date | null;
}

export class CreateBitacoraSuelo_dto {
  @IsNumber()
  @IsOptional()
  id!: number | null;

  @IsString()
  @IsNotEmpty()
  tectura!: string;

  @IsString()
  @IsNotEmpty()
  color!: string;

  @IsString()
  @IsNotEmpty()
  ph!: string;

  @IsString()
  @IsNotEmpty()
  nitrogen!: string;

  @IsString()
  @IsNotEmpty()
  potassium!: string;

  @IsString()
  @IsNotEmpty()
  aluminum!: string;

  @IsString()
  @IsNotEmpty()
  calcium!: string;

  @IsString()
  @IsNotEmpty()
  ferric_iron!: string;

  @IsString()
  @IsNotEmpty()
  humus!: string;

  @IsString()
  @IsNotEmpty()
  magnecium!: string;

  @IsString()
  @IsNotEmpty()
  nitrite_nitrogeno!: string;

  @IsString()
  @IsNotEmpty()
  sulfate!: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  fecha_levantamiento!: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  fecha_laboratorio!: Date;

  @IsNumber()
  @IsNotEmpty()
  productor_id!: number;

  @IsOptional()
  productor!: ProductorDto;
}
