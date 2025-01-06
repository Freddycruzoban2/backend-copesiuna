import { Request, Response } from "express";
import { ProductorService } from "../Services";
import { ApiResponse } from "../common/types/response/api-response";
import { number } from "mathjs";
import {
  CreateProductor_dto,
  UpdateProductor_dto,
} from "../Dtos/productor_dto";

export class ProductorController {
  private productorService: ProductorService;
  constructor() {
    this.productorService = new ProductorService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result = await this.productorService.findAllProductores();
    return new ApiResponse(result, "Datos de Productores retornados con exito");
  };

  find_all_asigned = async (): Promise<ApiResponse<any>> => {
    const result = await this.productorService.findAllProductoresAsigned();
    return new ApiResponse(result, "Datos de Productores retornados con exito");
  };

  create_one = async (data: CreateProductor_dto) => {
    const result = await this.productorService.create_productor(data);
    return new ApiResponse(result, "Datos de Productor creado con exito");
  };

  update_one = async (id: number, data: UpdateProductor_dto) => {
    const result = await this.productorService.updateProductor(id, data);
    return new ApiResponse(result, "Datos de Productor actualizado con exito");
  };

  delete_one = async (id: number) => {
    const result = await this.productorService.deleteProductor(id);
    return new ApiResponse(result, "Datos de Productor eliminado con exito");
  };
}
