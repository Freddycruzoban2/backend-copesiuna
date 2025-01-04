import { Request, Response } from "express";
import {
  AfectacionMazorca,
  EstimacionCosecha,
  Mazorca,
  Plantas,
} from "../entities";
import { MazorcaInterface } from "../interfaces";
import { CreateMazorca_dto, UpdateMazorca_dto } from "../Dtos/mazorca_dto";
import { NotFoundException } from "../common/utils";

export class MazorcaService {
  createMazorca = async (data: CreateMazorca_dto) => {
    const planta = await Plantas.findOneBy({
      id: data.id_planta,
    });
    if (!planta) {
      throw new NotFoundException(
        `La planta con id '${data.id_planta}' no existe o no han sido añadidas`
      );
    }

    try {
      const new_mazorca = new Mazorca();
      new_mazorca.cantidad = data.cantidad;
      new_mazorca.ID_afectacion = data.id_afectacion;
      new_mazorca.planta = planta;
      await new_mazorca.save();
      return new_mazorca;
    } catch (error) {
      throw new Error(`Error al crear Mazorca: '${(error as any).message}'`);
    }
  };

  updateMazorca = async (id: number, data: UpdateMazorca_dto) => {
    const mazorca = await Mazorca.findOne({ where: { id: id } });
    if (!mazorca) {
      throw new NotFoundException(
        "Las Mazorca a actualizar no existe o no han sido añadidas"
      );
    }

    try {
      const mazorcaUpdated = await Mazorca.update(id, { ...data });
      return {
        message: "Mazorca datos actualizado",
        mazorcaUpdated,
      };
    } catch (error: any) {
      throw new Error(
        `Error al actualizar Mazorca: '${(error as any).message}'`
      );
    }
  };

  findAllMazorca = async () => {
    const all_mazorca = await Mazorca.find({
      relations: ["afectacion", "planta"],
    });
    if (all_mazorca.length === 0) {
      throw new NotFoundException(`No hay registros de mazorca aun`);
    }
    return all_mazorca;
  };

  findAllPlanta = async () => {
    const all_mazorca = await Plantas.find({
      relations: ["afectacion", "estimacion"],
    });
    if (all_mazorca.length === 0) {
      throw new NotFoundException(`No hay registros de mazorca aun`);
    }
    return all_mazorca;
  };

  deleteMazorca = async (id: number) => {
    const mazorca = await Mazorca.findOne({ where: { id: id } });
    if (!mazorca) {
      throw new NotFoundException(`Mazorca data not found`);
    }

    try {
      await Mazorca.delete({ id: id });
      return {
        mazorca,
        message: "Mazorca data deleted",
      };
    } catch (error) {
      console.log("error", error);
      throw new Error(`Error al eliminar Mazorca: '${(error as any).message}'`);
    }
  };
}
