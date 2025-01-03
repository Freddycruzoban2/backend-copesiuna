import express, { Request, Response, NextFunction } from "express";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import { CreateMazorca_dto, UpdateMazorca_dto } from "../Dtos/mazorca_dto";
import { MazorcaController } from "../Controllers";
export const Mazorca_route = express.Router();
const MazorcaCotrl = new MazorcaController();

Mazorca_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await MazorcaCotrl.find_all();
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

Mazorca_route.get(
  "/findallplanta",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await MazorcaCotrl.find_all_planta();
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

Mazorca_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateMazorca_dto),
  async (req, res) => {
    try {
      const response = await MazorcaCotrl.create_one(req.body);
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

Mazorca_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await MazorcaCotrl.delete_one(id);
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

Mazorca_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdateMazorca_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await MazorcaCotrl.update_one(id, req.body);
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
