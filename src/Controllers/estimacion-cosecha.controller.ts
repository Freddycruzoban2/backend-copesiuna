import { Request, Response } from "express";
import { EstimacionCosechaService } from "../Services";
import { ApiResponse } from "../common/types/response/api-response";
import {
  CreateEstimacionCosecha_dto,
  UpdateEstimacionCosecha_dto,
} from "../Dtos/estimacion_cosecha_dto";

export class EstimacionCosechaController {
  private estimacionCosechaService: EstimacionCosechaService;
  constructor() {
    this.estimacionCosechaService = new EstimacionCosechaService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result =
      await this.estimacionCosechaService.findAllEstimacionCosecha();
    return new ApiResponse(
      result,
      "datos de Estimacion Cosecha retornados con Exito"
    );
  };

  find_one = async (id: number): Promise<ApiResponse<any>> => {
    const result =
      await this.estimacionCosechaService.findOneEstimacionCosecha(id);
    return new ApiResponse(
      result,
      "datos de Estimacion Cosecha retornados con Exito"
    );
  };

  create_one = async (
    data: CreateEstimacionCosecha_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.estimacionCosechaService.createEstimacionCosecha(
      data
    );
    return new ApiResponse(result, "Estimacion Cosecha Creada con Exito");
  };

  update_one = async (
    id: number,
    data: UpdateEstimacionCosecha_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.estimacionCosechaService.updateEstimacionCosecha(
      id,
      data
    );
    return new ApiResponse(result, "Estimacion Cosecha actualizada con Exito");
  };

  delete_one = async (id: number): Promise<ApiResponse<any>> => {
    const result = await this.estimacionCosechaService.deleteEstimacionCosecha(
      id
    );
    return new ApiResponse(result, "Estimacion Cosecha eliminada con Exito");
  };
}
