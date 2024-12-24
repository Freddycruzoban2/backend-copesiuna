import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { Parcela } from "../../entities";

export class CreateParcela_dto extends Parcela {
  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  descripcion!: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  tamaño_parcela!: string;

  @IsNotEmpty()
  @IsNumber()
  productorId!: number;

  @IsNotEmpty()
  @IsNumber()
  cultivoId!: number;

  @IsNotEmpty()
  @IsNumber()
  tipoParcelaId!: number;
}