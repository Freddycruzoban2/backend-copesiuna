import { PartialType } from "@nestjs/mapped-types";
import { CreateAfectacionesMazorca_dto } from "./create-afectaciones-mazorca.dto";

export class UpdateAfectacionesMazorca_dto extends PartialType(CreateAfectacionesMazorca_dto) {}

