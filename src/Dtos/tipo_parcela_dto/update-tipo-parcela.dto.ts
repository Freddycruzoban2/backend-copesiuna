import { PartialType } from "@nestjs/mapped-types";
import { CreateTipoParcela_dto } from "./create-tipo-parcela.dto";

export class UpdateTipoParcela_dto extends PartialType( CreateTipoParcela_dto) {
}