import express, { Request, Response, NextFunction } from "express";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import {
  CreateTipoParcela_dto,
  UpdateTipoParcela_dto,
} from "../Dtos/tipo_parcela_dto";
import { number } from "mathjs";
import { TipoParcelaController } from "../Controllers";
export const TipoParcela_route = express.Router();
const TipoParcelaCotrl = new TipoParcelaController();

TipoParcela_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await TipoParcelaCotrl.find_all();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);

TipoParcela_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await TipoParcelaCotrl.create_one(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);

TipoParcela_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await TipoParcelaCotrl.delete_one(id);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);

TipoParcela_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await TipoParcelaCotrl.update_one(id, req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
      console.log(error);
    }
  }
);
