import { PartialType } from "@nestjs/mapped-types";
import { CreateAsignacionTP_dto } from "./create-asignacion-TP.dto";

export class UpdateAsignacionTP_dto extends PartialType(CreateAsignacionTP_dto) {}
