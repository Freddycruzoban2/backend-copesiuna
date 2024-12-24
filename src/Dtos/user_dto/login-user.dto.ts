import { IsNotEmpty, IsString, IsEmail, Matches } from "class-validator";

export class LoginUser_dto {
  @IsNotEmpty()
  @IsEmail({}, { message: "La dirección de correo electrónico no es válida." })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-z]{5,}\.[a-z]{3,}$/, {
    message: "El formato del correo electrónico no es válido.",
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
