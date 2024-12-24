import { Request, Response } from "express";
import { CultivoService } from "../Services";
import { CreateCultivo_dto, UpdateCultivo_dto } from "../Dtos/cultivo_dto";
import { ApiResponse } from "../common/types/response/api-response";

export class CultivoController {
  private cultivoService: CultivoService;
  constructor() {
    this.cultivoService = new CultivoService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result = await this.cultivoService.findAllCultivo();
    return new ApiResponse(result, "datos de Cultivo retornados con Exito");
  };

  create_one = async (data: CreateCultivo_dto): Promise<ApiResponse<any>> => {
    const result = await this.cultivoService.findAllCultivo();
    return new ApiResponse(result, "datos de Cultivo creado con Exito");
  };

  update_one = async (
    id: number,
    data: UpdateCultivo_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.cultivoService.updateCultivo(id, data);

    return new ApiResponse(result, "datos de Cultivo actualizado con Exito");
  };

  delete_one = async (id: number): Promise<ApiResponse<any>> => {
    const result = await this.cultivoService.deleteCultivo(id);

    return new ApiResponse(result, "datos de Cultivo eliminados con Exito");
  };
}
