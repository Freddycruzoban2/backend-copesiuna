import { Request, Response } from "express";
import { CreateUser_dto, UpdateUser_Dto } from "../Dtos/user_dto";
import { ApiResponse } from "../common/types/response/api-response";
import { UserService } from "../Services";

export class UserController {
  private serviceUser: UserService;
  constructor() {
    this.serviceUser = new UserService();
  }

  find_all = async (): Promise<ApiResponse<any>> => {
    const result = await this.serviceUser.findAll();
    return new ApiResponse(result, "Datos Retornados con exito");
  };

  create_one = async (data: CreateUser_dto): Promise<ApiResponse<any>> => {
    const result = await this.serviceUser.createUser(data);
    return new ApiResponse(result, "Usuario Creado con Exito");
  };

  update_one = async (id: number, data: UpdateUser_Dto): Promise<ApiResponse<any>> => {
    const result = await this.serviceUser.updateUser(id, data);
    return new ApiResponse(result, "Usuario Actualizado con Exito");
  };

  delete_one = async (id: number): Promise<ApiResponse<any>> => {
    const result = await this.serviceUser.deleteUser(id);
    return new ApiResponse(result, "Usuario eliminado con Exito");
  };
}
