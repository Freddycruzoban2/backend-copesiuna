import express, { Request, Response, NextFunction } from "express";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import {
  CreateEstimacionCosecha_dto,
  UpdateEstimacionCosecha_dto,
} from "../Dtos/estimacion_cosecha_dto";
import { EstimacionCosechaController } from "../Controllers";
export const EstimacionCosecha_route = express.Router();
const EstimacionCosechaCotrl = new EstimacionCosechaController();

EstimacionCosecha_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await EstimacionCosechaCotrl.find_all();
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

EstimacionCosecha_route.get(
  "/find/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await EstimacionCosechaCotrl.find_one(id);
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

EstimacionCosecha_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateEstimacionCosecha_dto),
  async (req, res) => {
    try {
      const response = await EstimacionCosechaCotrl.create_one(req.body);
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

EstimacionCosecha_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await EstimacionCosechaCotrl.delete_one(id);
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

EstimacionCosecha_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdateEstimacionCosecha_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await EstimacionCosechaCotrl.update_one(id, req.body);
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
