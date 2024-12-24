import { PartialType } from "@nestjs/mapped-types";
import { CreateMazorca_dto } from "./create-mazorca.dto";

export class UpdateMazorca_dto extends PartialType(CreateMazorca_dto) {}

  