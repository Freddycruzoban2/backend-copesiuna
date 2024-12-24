import { PartialType } from "@nestjs/mapped-types";
import { CreatePropiedadesSuelo_dto } from "./create-propiedades-suelo.dto";


export class UpdatePropiedadesSuelo_dto extends PartialType(CreatePropiedadesSuelo_dto) {}
