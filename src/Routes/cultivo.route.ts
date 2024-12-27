import express, { Request, Response, NextFunction } from "express";
import { CultivoController } from "../Controllers";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import { CreateCultivo_dto, UpdateCultivo_dto } from "../Dtos/cultivo_dto";
export const Cultivo_route = express.Router();
const CultivoCotrl = new CultivoController();

Cultivo_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await CultivoCotrl.find_all();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);

Cultivo_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateCultivo_dto),
  async (req, res) => {
    try {
      const response = await CultivoCotrl.create_one(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);

Cultivo_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await CultivoCotrl.delete_one(id);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);

Cultivo_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdateCultivo_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await CultivoCotrl.update_one(id, req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: (error as any).message });
      console.log(error);
    }
  }
);
