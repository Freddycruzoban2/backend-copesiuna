import { IsString, IsNotEmpty, Length, IsOptional, MinLength, IsNumber } from "class-validator";
import { Cultivo } from "../../entities";


export class CreateCultivo_dto extends Cultivo {
    @IsString()
    @IsNotEmpty()
    @Length(3, 40)
    cultivo!: string;
  
    @IsString()
    @IsOptional()
    edad!: string;

    @IsOptional()
    @IsNumber()
    id_parcela!: number
}