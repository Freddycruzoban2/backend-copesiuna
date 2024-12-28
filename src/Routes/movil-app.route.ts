import express, { Request, Response, NextFunction } from "express";
import { LoadDataController } from "../Controllers";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import {
  CreateBitacoraEstimacionCosechaDto,
  CreateBitacoraSuelo_dto,
} from "../Dtos/load_bitacoras_dto";
import { Role } from "../common/enum/role.enum";
export const LoadMovilData_route = express.Router();
const controller = new LoadDataController();

LoadMovilData_route.post(
  "/createsuelo",
  authenticate,
  authorizeRole(["ADMIN", "TECNICO"]),
  validateDto(CreateBitacoraSuelo_dto),
  async (req, res): Promise<any> => {
    try {
      const userId = req.user?.id;
      if (userId === undefined) {
        return res.status(400).json({ message: "User ID is missing" });
      }
      const response = await controller.CreateBitacoraSuelo(userId, req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: (error as any).message,
      });
      console.log(error);
    }
  }
);

LoadMovilData_route.post(
  "/createcosecha",
  authenticate,
  authorizeRole(["ADMIN", "TECNICO"]),
  validateDto(CreateBitacoraEstimacionCosechaDto),
  async (req, res): Promise<any> => {
    try {
      const ID_user = req.user?.id;
      if (!ID_user) {
        return res.status(400).json({ message: "User ID is missing" });
      }
      const response = await controller.CreateBitacoraCosecha(
        ID_user,
        req.body
      );
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: (error as any).message,
      });
      console.log(error);
    }
  }
);
