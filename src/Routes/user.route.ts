import express, { Request, Response, NextFunction } from "express";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import { CreateUser_dto, UpdateUser_Dto } from "../Dtos/user_dto";
import { UserController } from "../Controllers";
export const user_route = express.Router();
const UserCtrl = new UserController();

user_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateUser_dto),
  async (req, res) => {
    try {
      const response = await UserCtrl.create_one(req.body);
      res.status(201).json(response);
    } catch (error: any) {
      res
        .status(error.statusCode)
        .json({
          message: "Internal Server Error",
          error: (error as any).message,
        });
      console.log(error);
    }
  }
);

user_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await UserCtrl.find_all();
      res.status(201).json(response);
    } catch (error: any) {
      res
        .status(error.statusCode)
        .json({
          message: "Internal Server Error",
          error: (error as any).message,
        });
      console.log(error);
    }
  }
);

user_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await UserCtrl.delete_one(id);
      res.status(201).json(response);
    } catch (error: any) {
      res
        .status(error.statusCode)
        .json({
          message: "Internal Server Error",
          error: (error as any).message,
        });
      console.log(error);
    }
  }
);

user_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN", "USER"]),
  validateDto(UpdateUser_Dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await UserCtrl.update_one(id, req.body);
      res.status(201).json(response);
    } catch (error: any) {
      res
        .status(error.statusCode)
        .json({
          message: "Internal Server Error",
          error: (error as any).message,
        });
      console.log(error);
    }
  }
);
