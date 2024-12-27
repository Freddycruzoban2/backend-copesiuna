import express, { Request, Response, NextFunction } from "express";
import { DetalleAnalisisSueloController } from "../Controllers";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import {
  CreateDetalleAnalisisSuelo_dto,
  UpdateDetalleAnalisisSuelo_dto,
} from "../Dtos/detalle_analisis_suelo_dto";
export const DetalleAnalisisSuelo_route = express.Router();
const DetalleAnalisisSueloCotrl = new DetalleAnalisisSueloController();

DetalleAnalisisSuelo_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await DetalleAnalisisSueloCotrl.find_all();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);

DetalleAnalisisSuelo_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateDetalleAnalisisSuelo_dto),
  async (req, res) => {
    try {
      const response = await DetalleAnalisisSueloCotrl.create_one(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);

DetalleAnalisisSuelo_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await DetalleAnalisisSueloCotrl.delete_one(id);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);

DetalleAnalisisSuelo_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdateDetalleAnalisisSuelo_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await DetalleAnalisisSueloCotrl.update_one(id, req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);
