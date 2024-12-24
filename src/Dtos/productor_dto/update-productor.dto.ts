import { PartialType } from "@nestjs/mapped-types";
import { CreateProductor_dto } from "./create-productor.dto";

export class UpdateProductor_dto extends PartialType(CreateProductor_dto) {}

  