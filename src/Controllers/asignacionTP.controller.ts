import { Request, Response } from "express";
import { AsignacionTPService } from "../Services";
import {
  CreateAsignacionTP_dto,
  UpdateAsignacionTP_dto,
} from "../Dtos/asignacionTP_dto";
import { ApiResponse } from "../common/types/response/api-response";

export class AsignacionTPController {
  private service: AsignacionTPService;
  constructor() {
    this.service = new AsignacionTPService();
  }

  create_one = async (
    data: CreateAsignacionTP_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.service.CreateAsignacionTP(data);
    return new ApiResponse(result, "Asignacion Creada con Exito");
  };

  update_one = async (
    id: number,
    data: UpdateAsignacionTP_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.service.UpdateAsignacionTP(id, data);
    return new ApiResponse(result, "Asignacion Actualizada con Exito");
  };

  delete_one = async (id: number): Promise<ApiResponse<any>> => {
    const result = await this.service.DeleteAsignacionTP(id);
    return new ApiResponse(result, "Asignacion eliminada con Exito");
  };

  findall_me = async (id: number): Promise<ApiResponse<any>> => {
    const result = await this.service.FindAllMeAsignacionTP(id);
    return new ApiResponse(result, "Datos de Asignaciones retornados con Exito");
  };

  findall = async (): Promise<ApiResponse<any>> => {
    const result = await this.service.FindAllAsignacionTP();
    return new ApiResponse(result, "Datos de Asignaciones retornados con Exito");
  };

  find_one = async (id: number): Promise<ApiResponse<any>> => {
    const result = await this.service.FindOneAsignacionTP(id);
    return new ApiResponse(result, "Asignacion Actualizada con Exito");
  };
}
