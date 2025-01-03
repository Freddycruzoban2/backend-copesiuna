import express, { Request, Response, NextFunction } from "express";
import { AfectacionesMazorcaController } from "../Controllers";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import {
  CreateAfectacionesMazorca_dto,
  UpdateAfectacionesMazorca_dto,
} from "../Dtos/afectaciones_mazorca_dto";
export const AfectacionesMazorca_route = express.Router();
const AfectacionesMazorcaCotrl = new AfectacionesMazorcaController();

AfectacionesMazorca_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await AfectacionesMazorcaCotrl.find_all();
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

AfectacionesMazorca_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateAfectacionesMazorca_dto),
  async (req, res) => {
    try {
      const response = await AfectacionesMazorcaCotrl.create_one(req.body);
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

AfectacionesMazorca_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await AfectacionesMazorcaCotrl.delete_one(id);
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

AfectacionesMazorca_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdateAfectacionesMazorca_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await AfectacionesMazorcaCotrl.update_one(id, req.body);
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
