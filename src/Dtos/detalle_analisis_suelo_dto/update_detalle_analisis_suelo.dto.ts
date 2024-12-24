
import { PartialType } from "@nestjs/mapped-types";
import { CreateDetalleAnalisisSuelo_dto } from "./create_detalle_analisis_suelo.dto";

export class UpdateDetalleAnalisisSuelo_dto extends PartialType(CreateDetalleAnalisisSuelo_dto) {}