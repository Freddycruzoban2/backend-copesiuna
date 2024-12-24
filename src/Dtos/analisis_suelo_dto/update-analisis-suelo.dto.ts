import { PartialType } from "@nestjs/mapped-types";
import { CreateAnalisisSuelo_dto } from "./create-analisis-suelo.dto";

export class UpdateAnalisisSuelo_dto extends PartialType(CreateAnalisisSuelo_dto) {}
