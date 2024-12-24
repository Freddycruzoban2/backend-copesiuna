import { Request, Response } from "express";
import { AfectacionesMazorcaService } from "../Services";
import { ApiResponse } from "../common/types/response/api-response";
import {
  CreateAfectacionesMazorca_dto,
  UpdateAfectacionesMazorca_dto,
} from "../Dtos/afectaciones_mazorca_dto";

export class AfectacionesMazorcaController {
  private afectacionesMazorcaService: AfectacionesMazorcaService;
  constructor() {
    this.afectacionesMazorcaService = new AfectacionesMazorcaService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result =
      await this.afectacionesMazorcaService.findAllAfectacionesMazorca();
    return new ApiResponse(
      result,
      "datos de Afectaciones Mazorcas retornados con Exito"
    );
  };

  create_one = async (
    data: CreateAfectacionesMazorca_dto
  ): Promise<ApiResponse<any>> => {
    const result =
      await this.afectacionesMazorcaService.createAfectacionesMazorca(data);
    return new ApiResponse(
      result,
      "datos de Afectaciones Mazorcas creado con Exito"
    );
  };

  update_one = async (
    id: number,
    data: UpdateAfectacionesMazorca_dto
  ): Promise<ApiResponse<any>> => {
    const result =
      await this.afectacionesMazorcaService.updateAfectacionesMazorca(id, data);
    return new ApiResponse(
      result,
      "datos de Afectaciones Mazorcas actualizado con Exito"
    );
  };

  delete_one = async (id: number): Promise<ApiResponse<any>> => {
    const result =
      await this.afectacionesMazorcaService.deleteAfectacionesMazorca(id);
    return new ApiResponse(
      result,
      "datos de Afectaciones Mazorcas eliminados con Exito"
    );
  };
}
