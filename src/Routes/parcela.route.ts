import express, { Request, Response, NextFunction } from "express";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import { CreateParcela_dto, UpdateParcela_dto } from "../Dtos/parcelas_dto";
import { ParcelaController } from "../Controllers";
export const Parcela_route = express.Router();
const ParcelaCotrl = new ParcelaController();

Parcela_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await ParcelaCotrl.find_all();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);

Parcela_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateParcela_dto),
  async (req, res) => {
    try {
      const response = await ParcelaCotrl.create_one(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);

Parcela_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await ParcelaCotrl.delete_one(id);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);

Parcela_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdateParcela_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await ParcelaCotrl.update_one(id, req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);
