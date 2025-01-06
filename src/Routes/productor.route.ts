import express, { Request, Response, NextFunction } from "express";
import { validateDto, authenticate, authorizeRole } from "../Middlewares";
import { CreateProductor_dto } from "../Dtos/productor_dto/create-productor.dto";
import { UpdateProductor_dto } from "../Dtos/productor_dto/update-productor.dto";
import { ProductorController } from "../Controllers";
export const Productor_route = express.Router();
const ProductorCotrl = new ProductorController();

Productor_route.get(
  "/findall",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await ProductorCotrl.find_all();
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

Productor_route.get(
  "/findallasig",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const response = await ProductorCotrl.find_all_asigned();
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

Productor_route.post(
  "/create",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(CreateProductor_dto),
  async (req, res) => {
    try {
      const response = await ProductorCotrl.create_one(req.body);
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

Productor_route.delete(
  "/delete/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await ProductorCotrl.delete_one(id);
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

Productor_route.patch(
  "/update/:id",
  authenticate,
  authorizeRole(["ADMIN"]),
  validateDto(UpdateProductor_dto),
  async (req, res) => {
    try {
      const id = Number(req.params.id);
      const response = await ProductorCotrl.update_one(id, req.body);
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
