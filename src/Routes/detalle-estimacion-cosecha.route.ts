import express, { Request, Response, NextFunction } from "express";
import { DetalleEstimacionCosechaController } from "../Controllers";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import {
  CreateDetalleEstimacionCosecha_dto,
  UpdatetalleEstimacionCosecha_dto,
} from "../Dtos/detalle_estimacion_cosecha_dto";
export const DetalleEstimacionCosecha_route = express.Router();
const DetalleEstimacionCosechaCotrl = new DetalleEstimacionCosechaController();

DetalleEstimacionCosecha_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await DetalleEstimacionCosechaCotrl.find_all();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);

DetalleEstimacionCosecha_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateDetalleEstimacionCosecha_dto),
  async (req, res) => {
    try {
      const response = await DetalleEstimacionCosechaCotrl.create_one(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);

DetalleEstimacionCosecha_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await DetalleEstimacionCosechaCotrl.delete_one(id);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);

DetalleEstimacionCosecha_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdatetalleEstimacionCosecha_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await DetalleEstimacionCosechaCotrl.update_one(
        id,
        req.body
      );
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);