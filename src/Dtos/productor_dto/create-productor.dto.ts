import {
    IsOptional,
    IsNotEmpty,
    IsString,
    IsNumber,
    Length,
    IsEmail,
    Matches,
    IsEnum,
    MinLength,
    min,
  } from "class-validator";
import { Productor } from "../../entities";
  //import { Role } from 'src/common/enum/role.enum';
  
  export class CreateProductor_dto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 40)
    nombre!: string;
  
    @IsString()
    @IsOptional()
    @MinLength(5)
    apellido!: string;
  
    @IsString()
    @IsOptional()
    @MinLength(8)
    direccion!: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(14)
    cedula!: string;
    
  }
  