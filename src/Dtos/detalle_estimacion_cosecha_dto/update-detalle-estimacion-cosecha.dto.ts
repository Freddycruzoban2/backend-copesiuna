import { PartialType } from "@nestjs/mapped-types";
import { CreateDetalleEstimacionCosecha_dto } from "./create-detalle-estimacion-cosecha.dto";


export class UpdatetalleEstimacionCosecha_dto extends PartialType(CreateDetalleEstimacionCosecha_dto) {}

