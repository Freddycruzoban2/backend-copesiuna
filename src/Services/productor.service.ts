import { Request, Response } from "express";
import { Productor } from "../entities";
import { ProductorInterface } from "../interfaces";
import { NotFoundException, ProductorDataRetorn } from "../common/utils";
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
    } catch (error: any) {
      throw new Error(`Error al crear Productor ${error.message}`);
    }
  };

  updateProductor = async (
    id: number,
    data: UpdateProductor_dto
  ): Promise<any> => {
    const productorFind = await Productor.findOne({ where: { id: id } });
    if (!productorFind) {
      throw new NotFoundException("Productor data not found");
    }

    try {
      const productorUpdated = await Productor.update(id, { ...data });
      return {
        message: "Productor actualizado",
        productorUpdated,
      };
    } catch (error: any) {
      throw new Error(`Error al actualizar Productor: "${error.message}"`);
    }
  };

  findAllProductores = async (): Promise<Productor[] | { message: string }> => {
    const all_productores = await Productor.find();
    if (all_productores.length === 0) {
      throw new NotFoundException("Productor data not found");
    }
    return all_productores;
  };

  deleteProductor = async (
    id: number
  ): Promise<Productor | ProductorDataRetorn> => {
    const productor = await Productor.findOne({ where: { id: id } });
    if (!productor) {
      throw new NotFoundException("Productor data not found");
    }

    try {
      await Productor.delete({ id: id });
      return {
        message: "Productor deleted",
        productor,
      };
    } catch (error: any) {
      console.log("error", error);
      throw new Error(`Error al eliminar Productor: "${error.message}"`);
    }
  };
}
