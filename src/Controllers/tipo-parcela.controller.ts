import { Request, Response } from "express";
import { TipoParcelaService } from "../Services";
import {
  CreateTipoParcela_dto,
  UpdateTipoParcela_dto,
} from "../Dtos/tipo_parcela_dto";
import { ApiResponse } from "../common/types/response/api-response";

export class TipoParcelaController {
  private tipoParcelaService: TipoParcelaService;
  constructor() {
    this.tipoParcelaService = new TipoParcelaService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result = await this.tipoParcelaService.findAllTipoParcela();
    return new ApiResponse(result, "Datos de Parcela retornados con Exito");
  };

  create_one = async (
    data: CreateTipoParcela_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.tipoParcelaService.createTipoParcela(data);
    return new ApiResponse(result, "Tipo Parcela Creada con Exito");
  };

  update_one = async (
    id: number,
    data: UpdateTipoParcela_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.tipoParcelaService.updateTipoParcela(id, data);
    return new ApiResponse(result, "Tipo Parcela actualizada con Exito");
  };

  delete_one = async (id: number): Promise<ApiResponse<any>> => {
    const result = await this.tipoParcelaService.deleteTipoParcela(id);
    return new ApiResponse(result, "Tipo Parcela eliminada con Exito");
  };
}
