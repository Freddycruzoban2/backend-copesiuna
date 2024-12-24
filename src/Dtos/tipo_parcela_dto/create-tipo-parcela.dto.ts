import { IsString, IsNotEmpty, Length, IsOptional, MinLength } from "class-validator";
import { TipoParcela } from "../../entities";


export class CreateTipoParcela_dto extends TipoParcela {
    @IsString()
    @IsNotEmpty()
    @Length(4, 40)
    descripcion!: string;
}