import { PartialType } from "@nestjs/mapped-types";
import { CreateCultivo_dto } from "./create-cultivo.dto";

export class UpdateCultivo_dto extends PartialType(CreateCultivo_dto) {}

  