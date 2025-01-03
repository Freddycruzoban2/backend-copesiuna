import express, { Request, Response, NextFunction } from "express";
import { PropiedadesSueloController } from "../Controllers";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import {
  CreatePropiedadesSuelo_dto,
  UpdatePropiedadesSuelo_dto,
} from "../Dtos/propiedades_suelo_dto";
import { parseArgs } from "util";
export const PropiedadSuelo_route = express.Router();
const PropiedadesSueloCotrl = new PropiedadesSueloController();

PropiedadSuelo_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await PropiedadesSueloCotrl.find_all();
      res.status(201).json(response);
    } catch (error: any) {
      res.status(error.statusCode).json({
        message: "Internal Server Error",
        error: (error as any).message,
      });
      console.log(error);
    }
  }
);

PropiedadSuelo_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreatePropiedadesSuelo_dto),
  async (req, res) => {
    try {
      const response = await PropiedadesSueloCotrl.create_one(req.body);
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

PropiedadSuelo_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await PropiedadesSueloCotrl.delete_one(id);
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

PropiedadSuelo_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdatePropiedadesSuelo_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await PropiedadesSueloCotrl.update_one(id, req.body);
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
