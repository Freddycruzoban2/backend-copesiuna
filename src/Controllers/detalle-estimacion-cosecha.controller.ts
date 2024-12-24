import { Request, Response } from "express";
import { DetalleEstimacionCosechaService } from "../Services";
import { ApiResponse } from "../common/types/response/api-response";
import {
  CreateDetalleEstimacionCosecha_dto,
  UpdatetalleEstimacionCosecha_dto,
} from "../Dtos/detalle_estimacion_cosecha_dto";

export class DetalleEstimacionCosechaController {
  private detalleEstimacionCosechaService: DetalleEstimacionCosechaService;
  constructor() {
    this.detalleEstimacionCosechaService =
      new DetalleEstimacionCosechaService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result =
      await this.detalleEstimacionCosechaService.findAllDetalleEstimacionCosecha();
    return new ApiResponse(
      result,
      "datos de Detalle Estimacion Cosecha retornados con Exito"
    );
  };

  create_one = async (
    data: CreateDetalleEstimacionCosecha_dto
  ): Promise<ApiResponse<any>> => {
    const result =
      await this.detalleEstimacionCosechaService.createDetalleEstimacionCosecha(
        data
      );
    return new ApiResponse(
      result,
      "datos de Detalle Estimacion Cosecha creados con Exito"
    );
  };

  update_one = async (
    id: number,
    data: UpdatetalleEstimacionCosecha_dto
  ): Promise<ApiResponse<any>> => {
    const result =
      await this.detalleEstimacionCosechaService.updateDetalleEstimacionCosecha(
        id,
        data
      );
    return new ApiResponse(
      result,
      "datos de Detalle Estimacion Cosecha actualizados con Exito"
    );
  };

  delete_one = async (id: number): Promise<ApiResponse<any>> => {
    const result =
      await this.detalleEstimacionCosechaService.deleteDetalleEstimacionCosecha(
        id
      );
    return new ApiResponse(
      result,
      "datos de Detalle Estimacion Cosecha eliminados con Exito"
    );
  };
}
