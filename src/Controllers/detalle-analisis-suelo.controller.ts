import { Request, Response } from "express";
import { DetalleAnalisisSueloService } from "../Services";
import { ApiResponse } from "../common/types/response/api-response";
import {
  CreateDetalleAnalisisSuelo_dto,
  UpdateDetalleAnalisisSuelo_dto,
} from "../Dtos/detalle_analisis_suelo_dto";
import { NumericLiteral } from "typescript";

export class DetalleAnalisisSueloController {
  private detalleAnalisisSueloService: DetalleAnalisisSueloService;
  constructor() {
    this.detalleAnalisisSueloService = new DetalleAnalisisSueloService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result =
      await this.detalleAnalisisSueloService.findAllDetalleAnalisisSuelo();
    return new ApiResponse(
      result,
      "datos de Detalle Analisis Suelo retornados con Exito"
    );
  };

  create_one = async (
    data: CreateDetalleAnalisisSuelo_dto
  ): Promise<ApiResponse<any>> => {
    const result =
      await this.detalleAnalisisSueloService.createDetalleAnalisisSuelo(data);
    return new ApiResponse(
      result,
      "datos de Detalle Analisis Suelo retornados con Exito"
    );
  };

  update_one = async (
    id: number,
    data: UpdateDetalleAnalisisSuelo_dto
  ): Promise<ApiResponse<any>> => {
    const result =
      await this.detalleAnalisisSueloService.UpdateDetalleAnalisisSuelo(
        id,
        data
      );
    return new ApiResponse(
      result,
      "datos de Detalle Analisis Suelo retornados con Exito"
    );
  };

  delete_one = async (id: number): Promise<ApiResponse<any>> => {
    const result =
      await this.detalleAnalisisSueloService.deleteDetalleAnalisisSuelo(id);
    return new ApiResponse(
      result,
      "datos de Detalle Analisis Suelo retornados con Exito"
    );
  };
}
