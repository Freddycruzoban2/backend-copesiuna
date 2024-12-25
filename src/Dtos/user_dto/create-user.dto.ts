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
} from "class-validator";
import { Role } from '../../common/enum/role.enum';

export class CreateUser_dto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  nombre!: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  apellido!: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  telefono!: string;

  @IsNotEmpty()
  @IsEmail({}, { message: "La dirección de correo electrónico no es válida." })
  @Length(14)
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-z]{5,}\.[a-z]{3,}$/, {
    message: "El formato del correo electrónico no es válido.",
  })
  email!: string;

  @IsString()
  @IsOptional()
  @IsEnum(Role, {
    message:
      `El valor del role proporcionado no es válido. Debe ser ${Role.Admin} o ${Role.TECNICO}.`,
  })
  role!: Role;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
