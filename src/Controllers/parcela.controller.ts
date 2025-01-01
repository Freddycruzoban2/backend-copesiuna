import { Request, Response } from "express";
import { CreateParcela_dto, UpdateParcela_dto } from "../Dtos/parcelas_dto";
import { ApiResponse } from "../common/types/response/api-response";
import { ParcelaService } from "../Services";

export class ParcelaController {
  private service_parcela: ParcelaService;
  constructor() {
    this.service_parcela = new ParcelaService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result = await this.service_parcela.findAllParcela();
    return new ApiResponse(result, "Datos de Parcela retornados con Exito");
  };

  create_one = async (input: CreateParcela_dto): Promise<ApiResponse<any>> => {
    const result = await this.service_parcela.createParcela(input);
    return new ApiResponse(result, "Parcela Creada con Exito");
  };

  update_one = async (
    id: number,
    data: UpdateParcela_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.service_parcela.updateParcela(id, data);
    return new ApiResponse(result, "Parceka Actualizada con Exito");
  };

  delete_one = async (id: number) => {
    const result = await this.service_parcela.deleteParcela(id);
    return new ApiResponse(result, "Parcela eliminada con Exito");
  };
}
