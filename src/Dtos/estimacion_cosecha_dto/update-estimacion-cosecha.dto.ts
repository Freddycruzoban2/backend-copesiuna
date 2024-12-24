import { PartialType } from "@nestjs/mapped-types";
import { CreateEstimacionCosecha_dto } from "./create-estimacion-cosecha.dto";


export class UpdateEstimacionCosecha_dto extends PartialType(CreateEstimacionCosecha_dto) {}

