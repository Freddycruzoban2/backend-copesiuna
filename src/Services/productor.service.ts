import { Request, Response } from "express";
import { Productor } from "../entities";
import { ProductorInterface } from "../interfaces";
import { ProductorDataRetorn } from "../common/utils";
import {
  CreateProductor_dto,
  UpdateProductor_dto,
} from "../Dtos/productor_dto";

export class ProductorService {
  create_productor = async (
    data: CreateProductor_dto
  ): Promise<Productor | ProductorDataRetorn> => {
    try {
      const newProductor = new Productor();
      newProductor.nombre = data.nombre;
      newProductor.apellido = data.apellido;
      newProductor.direccion = data.direccion;
      newProductor.cedula = data.cedula;
      await newProductor.save();
      return newProductor;
    } catch (error) {
      return { message: "Error al actualizar el productor", error };
    }
  };

  updateProductor = async (
    id: number,
    data: UpdateProductor_dto
  ): Promise<any> => {
    try {
      const productorFind = await Productor.findOne({ where: { id: id } });
      if (!productorFind) {
        return { message: "Productor no encontrado" };
      }
      const productorUpdated = await Productor.update(id, { ...data });
      return {
        message: "Productor actualizado",
        productorUpdated,
      };
    } catch (error) {
      return { message: "Error al actualizar el productor", error };
    }
  };

  findAllProductores = async (): Promise<Productor[] | { message: string }> => {
    const all_productores = await Productor.find();
    if (all_productores.length === 0) {
      return { message: "No hay Productores registrados" };
    }
    return all_productores;
  };

  deleteProductor = async (
    id: number
  ): Promise<Productor | ProductorDataRetorn> => {
    try {
      const productor = await Productor.findOne({ where: { id: id } });
      if (!productor) {
        return { message: "Productor not found" };
      }
      await Productor.delete({ id: id });
      return {
        message: "Productor deleted",
        productor,
      };
    } catch (error) {
      console.log("error", error);
      return { message: "Error deleting user", error: error };
    }
  };
}
