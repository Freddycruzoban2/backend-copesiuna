import { Request, Response } from "express";
import { LoadDataService } from "../Services";
import {
  CreateBitacoraSuelo_dto,
  CreateBitacoraEstimacionCosechaDto,
} from "../Dtos/load_bitacoras_dto";
import { ApiResponse } from "../common/types/response/api-response";

export class LoadDataController {
  private service: LoadDataService;
  constructor() {
    this.service = new LoadDataService();
  }

  CreateBitacoraSuelo = async (
    ID_user: number,
    input: CreateBitacoraSuelo_dto
  ): Promise<ApiResponse<any>> => {
    const result = await this.service.CreateBitacoraSuelo(ID_user, input);
    return result; 
  };

  CreateBitacoraCosecha = async (
    ID_user: number,
    input: CreateBitacoraEstimacionCosechaDto
  ): Promise<ApiResponse<any>> => {
    const result = await this.service.CreateBitacoraCosecha(ID_user, input);
    return result;
  };
}
