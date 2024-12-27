import express, { Request, Response, NextFunction } from "express";
import { AnalisisSueloController } from "../Controllers";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import {
  CreateAnalisisSuelo_dto,
  UpdateAnalisisSuelo_dto,
} from "../Dtos/analisis_suelo_dto";
export const AnalisisSuelo_route = express.Router();
const AnalisisSueloCotrl = new AnalisisSueloController();

AnalisisSuelo_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await AnalisisSueloCotrl.find_all();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);

AnalisisSuelo_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateAnalisisSuelo_dto),
  async (req, res) => {
    try {
      const response = await AnalisisSueloCotrl.create_one(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);

AnalisisSuelo_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await AnalisisSueloCotrl.delete_one(id);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  });

AnalisisSuelo_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdateAnalisisSuelo_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await AnalisisSueloCotrl.update_one(id, req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  });
