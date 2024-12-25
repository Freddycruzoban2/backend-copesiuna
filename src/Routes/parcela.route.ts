import express from "express";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import { CreateParcela_dto, UpdateParcela_dto } from "../Dtos/parcelas_dto";
import { ParcelaController } from "../Controllers";

export const Parcela_route = express.Router();
const ParcelaCotrl = new ParcelaController();

Parcela_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res, next) => {
    try {
      const response = await ParcelaCotrl.find_all();
      res.status(200).json(response);
    } catch (error) {
      next(error); // Delegar al middleware de errores
    }
  }
);

Parcela_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateParcela_dto),
  async (req, res, next) => {
    try {
      const response = await ParcelaCotrl.create_one(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

Parcela_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const response = await ParcelaCotrl.delete_one(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

Parcela_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdateParcela_dto),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const response = await ParcelaCotrl.update_one(id, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);
