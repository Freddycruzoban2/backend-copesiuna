import { Request, Response } from "express";
import { AutenticacionService } from "../Services";
import { CreateUser_dto, LoginUser_dto } from "../Dtos/user_dto";
import { ApiResponse } from "../common/types/response/api-response";

export class AutenticacionController {
  private authService: AutenticacionService;
  constructor() {
    this.authService = new AutenticacionService();
  }

  signin = async (data: LoginUser_dto): Promise<any> => {
    return await this.authService.signin(data);
  };

  signup = async (data: CreateUser_dto): Promise<any> => {
    return await this.authService.signup(data);
  };
}
