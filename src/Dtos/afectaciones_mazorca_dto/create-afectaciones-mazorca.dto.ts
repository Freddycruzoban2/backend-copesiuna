import { IsString, IsNotEmpty, Length, IsOptional, MinLength } from "class-validator";
import { AfectacionMazorca } from "../../entities";


export class CreateAfectacionesMazorca_dto extends AfectacionMazorca {
    @IsString()
    @IsNotEmpty()
    @Length(3, 40)
    nombre!: string;
  
    @IsString()
    @IsOptional()
    @MinLength(5)
    descripcion!: string;   
}