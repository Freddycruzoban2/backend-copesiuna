import { Request, Response } from "express";
import { AnalisisSueloService } from "../Services";
import { ApiResponse } from "../common/types/response/api-response";
import {
  CreateAnalisisSuelo_dto,
  UpdateAnalisisSuelo_dto,
} from "../Dtos/analisis_suelo_dto";

export class AnalisisSueloController {
  private analisisSueloService: AnalisisSueloService;
  constructor() {
    this.analisisSueloService = new AnalisisSueloService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result = await this.analisisSueloService.findAllAnalisisSuelo();
    return new ApiResponse(
      result,
      "datos de Analisis de Suelo retornados con Exito"
    );
  };

  create_one = async (
    data: CreateAnalisisSuelo_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.analisisSueloService.createAnalisisSuelo(data);
    return new ApiResponse(
      result,
      "datos de Analisis de Suelo Creada con Exito"
    );
  };

  update_one = async (
    id: number,
    data: UpdateAnalisisSuelo_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.analisisSueloService.UpdateAnalisisSuelo(
      id,
      data
    );
    return new ApiResponse(
      result,
      "datos de Analisis de Suelo actualizado con Exito"
    );
  };

  delete_one = async (id: number): Promise<ApiResponse<any>> => {
    const result = await this.analisisSueloService.deleteAnalisisSuelo(id);
    return new ApiResponse(
      result,
      "datos de Analisis de Suelo eliminados con Exito"
    );
  };
}
