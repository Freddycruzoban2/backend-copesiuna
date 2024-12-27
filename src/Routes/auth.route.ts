import express from "express";
import { AutenticacionController } from "../Controllers";
import { authorizeRole, validateDto } from "../Middlewares";
import { CreateUser_dto, LoginUser_dto } from "../Dtos/user_dto";
export const Auth_route = express.Router();
const AuthCtrlo = new AutenticacionController();

Auth_route.post(
  "/signup",
  // authorizeRole(["ADMIN", "TECNICO"]),
  validateDto(CreateUser_dto),
  async (req, res) => {
    try {
      const response = await AuthCtrlo.signup(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);

Auth_route.post(
  "/signin",
  // authorizeRole(["ADMIN", "TECNICO"]),
  validateDto(LoginUser_dto),
  async (req, res, next) => {
    try {
      const response = await AuthCtrlo.signin(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);
