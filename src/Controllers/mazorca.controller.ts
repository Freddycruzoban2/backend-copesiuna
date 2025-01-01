import { Request, Response } from "express";
import { MazorcaService } from "../Services";
import { ApiResponse } from "../common/types/response/api-response";
import { CreateMazorca_dto, UpdateMazorca_dto } from "../Dtos/mazorca_dto";

export class MazorcaController {
  private mazorcaService: MazorcaService;
  constructor() {
    this.mazorcaService = new MazorcaService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result = await this.mazorcaService.findAllMazorca();
    return new ApiResponse(result, "Datos de Mazorca retornados con Exito");
  };

  find_all_planta = async (): Promise<ApiResponse<any>> => {
    const result = await this.mazorcaService.findAllPlanta();
    return new ApiResponse(result, "Datos de Mazorca retornados con Exito");
  };

  create_one = async (data: CreateMazorca_dto) => {
    const result = await this.mazorcaService.createMazorca(data);
    return new ApiResponse(result, "Datos de Mazorca creada con Exito");
  };

  update_one = async (id: number, data: UpdateMazorca_dto) => {
    const result = await this.mazorcaService.updateMazorca(id, data);
    return new ApiResponse(result, "Datos de Mazorca retornados con Exito");
  };

  delete_one = async (id: number) => {
    const result = await this.mazorcaService.deleteMazorca(id);
    return new ApiResponse(result, "Datos de Mazorca retornados con Exito");
  };
}
