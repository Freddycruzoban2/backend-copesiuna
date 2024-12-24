import { Request, Response } from "express";
import {
  AfectacionMazorca,
  EstimacionCosecha,
  Mazorca,
  Plantas,
} from "../entities";
import { MazorcaInterface } from "../interfaces";
import { CreateMazorca_dto, UpdateMazorca_dto } from "../Dtos/mazorca_dto";

export class MazorcaService {
  createMazorca = async (data: CreateMazorca_dto) => {
    try {
      const planta = await Plantas.findOneBy({
        id: data.id_planta,
      });
      if (!planta) {
        throw new Error(
          `La planta con id '${data.id_planta}' no existe o no han sido añadidas`
        );
      }

      const new_mazorca = new Mazorca();
      new_mazorca.cantidad = data.cantidad;
      new_mazorca.estado = data.estado;
      // Si se recibe una afectacion directa de las mazorcas las buscamos en la base de datos
      if (data.id_afectaciones) {
        const afectaciones_mazorca = await AfectacionMazorca.findOneBy({
          id: data.id_afectaciones,
        });
        if (!afectaciones_mazorca) {
          return "Las afectaciones de mazorca no existen o no han sido añadidas";
        }
        new_mazorca.afectacion = afectaciones_mazorca;
      }
      new_mazorca.planta = planta;
      await new_mazorca.save();
      return new_mazorca;
    } catch (error) {
      return { message: "Error al crear usuario", error: error };
    }
  };

  updateMazorca = async (id: number, data: UpdateMazorca_dto) => {
    try {
      const mazorca = await Mazorca.findOne({ where: { id: id } });
      if (!mazorca) {
        return "Las Mazorca a actualizar no existe o no han sido añadidas";
      }
      const mazorcaUpdated = await Mazorca.update(id, { ...data });
      return {
        message: "Mazorca datos actualizado",
        mazorcaUpdated,
      };
    } catch (error) {
      return { message: "Error al actualizar los datos de Mazorca", error };
    }
  };

  findAllMazorca = async () => {
    const all_mazorca = await Mazorca.find({
      relations: ["afectacion", "planta"],
    });
    if (all_mazorca.length === 0) {
      return { message: "No hay registros de Mazorca aun..." };
    }
    return all_mazorca;
  };

  deleteMazorca = async (id: number) => {
    try {
      const mazorca = await Mazorca.findOne({ where: { id: id } });
      if (!mazorca) {
        return { message: "Mazorca data not found" };
      }
      await Mazorca.delete({ id: id });
      return {
        mazorca,
        message: "Mazorca data deleted",
      };
    } catch (error) {
      console.log("error", error);
      return { message: "Error deleting Mazorca data", error: error };
    }
  };
}
