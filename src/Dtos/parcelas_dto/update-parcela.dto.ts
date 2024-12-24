import { PartialType } from "@nestjs/mapped-types";
import { CreateParcela_dto } from "./create-parcela.dto";

export class UpdateParcela_dto extends PartialType(CreateParcela_dto) {}

  