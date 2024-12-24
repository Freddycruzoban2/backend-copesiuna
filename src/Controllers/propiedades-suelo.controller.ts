import { Request, Response } from "express";
import { PropiedadesSueloService } from "../Services";
import { ApiResponse } from "../common/types/response/api-response";
import {
  CreatePropiedadesSuelo_dto,
  UpdatePropiedadesSuelo_dto,
} from "../Dtos/propiedades_suelo_dto";

export class PropiedadesSueloController {
  private propiedadesSueloService: PropiedadesSueloService;
  constructor() {
    this.propiedadesSueloService = new PropiedadesSueloService();
  }
  find_all = async (): Promise<ApiResponse<any>> => {
    const result = await this.propiedadesSueloService.findAllPropiedadesSuelo();
    return new ApiResponse(
      result,
      "Datos de propiedades_suelo retornados con exito"
    );
  };

  create_one = async (data: CreatePropiedadesSuelo_dto) => {
    const result = await this.propiedadesSueloService.createPropiedadesSuelo(
      data
    );
    return new ApiResponse(result, "propiedades_suelo creada con exito");
  };

  update_one = async (id: number, data: UpdatePropiedadesSuelo_dto) => {
    const result = await this.propiedadesSueloService.updatePropiedadesSuelo(
      id,
      data
    );
    return new ApiResponse(
      result,
      "Datos de propiedades_suelo actualizado con exito"
    );
  };

  delete_one = async (id: number) => {
    const result = await this.propiedadesSueloService.deletePropiedadesSuelo(
      id
    );
    return new ApiResponse(
      result,
      "Datos de propiedades_suelo eliminado con exito"
    );
  };
}
