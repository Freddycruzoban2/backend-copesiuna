import express, { Request, Response, NextFunction } from "express";
import { AsignacionTPController } from "../Controllers";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import {
  CreateAsignacionTP_dto,
  UpdateAsignacionTP_dto,
} from "../Dtos/asignacionTP_dto";
import { Any } from "typeorm";
export const AsignacionTP_route = express.Router();
const AsignacionCtrl = new AsignacionTPController();

AsignacionTP_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateAsignacionTP_dto),
  async (req, res) => {
    try {
      const response = await AsignacionCtrl.create_one(req.body);
      res.status(201).json(response);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Internal Server Error",
          error: (error as any).message,
        });
      console.log(error);
    }
  }
);

AsignacionTP_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdateAsignacionTP_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await AsignacionCtrl.update_one(id, req.body);
      res.status(201).json(response);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Internal Server Error",
          error: (error as any).message,
        });
      console.log(error);
    }
  }
);

AsignacionTP_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await AsignacionCtrl.delete_one(id);
      res.status(201).json(response);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Internal Server Error",
          error: (error as any).message,
        });
      console.log(error);
    }
  }
);

AsignacionTP_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await AsignacionCtrl.findall();
      res.status(201).json(response);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Internal Server Error",
          error: (error as any).message,
        });
      console.log(error);
    }
  }
);

AsignacionTP_route.get(
  "/find/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await AsignacionCtrl.find_one(req.body);
      res.status(201).json(response);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Internal Server Error",
          error: (error as any).message,
        });
      console.log(error);
    }
  }
);
