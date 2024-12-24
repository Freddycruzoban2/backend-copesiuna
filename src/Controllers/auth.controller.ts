import { Request, Response } from "express";
import { AutenticacionService } from "../Services";
import { CreateUser_dto, LoginUser_dto } from "../Dtos/user_dto";
import { ApiResponse } from "../common/types/response/api-response";

export class AutenticacionController {
  private authService: AutenticacionService;
  constructor() {
    this.authService = new AutenticacionService();
  }

  signin = async (data: LoginUser_dto): Promise<ApiResponse<any>> => {
    const result = await this.authService.signin(data);
    return new ApiResponse(result, "Usuario logueado con exito");
  };

  signup = async (data: CreateUser_dto): Promise<ApiResponse<any>> => {
    const result = await this.authService.signup(data);
    return new ApiResponse(result, "datos de Usuario creado con Exito");
  };
}
