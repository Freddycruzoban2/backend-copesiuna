import { Request, Response } from "express";
import { AfectacionMazorca } from "../entities";
import { AfectacionesMazorcaInterface } from "../interfaces";
import {
  CreateAfectacionesMazorca_dto,
  UpdateAfectacionesMazorca_dto,
} from "../Dtos/afectaciones_mazorca_dto";

export class AfectacionesMazorcaService {
  createAfectacionesMazorca = async (
    data: CreateAfectacionesMazorca_dto
  ): Promise<AfectacionMazorca | { message: string; error: any }> => {
    try {
      const new_afectacion_mazorca = new AfectacionMazorca();
      new_afectacion_mazorca.nombre = data.nombre;
      if (data.descripcion) {
        new_afectacion_mazorca.descripcion = data.descripcion;
      }
      await new_afectacion_mazorca.save();

      return new_afectacion_mazorca;
    } catch (error) {
      return { message: "Error al crear Afectacion Mazorca", error: error };
    }
  };

  updateAfectacionesMazorca = async (
    id: number,
    data: UpdateAfectacionesMazorca_dto
  ): Promise<any> => {
    try {
      const afectaciones_mazorca = await AfectacionMazorca.findOne({
        where: { id: id },
      });
      if (!afectaciones_mazorca) {
        return { message: "datos de Afectacion Mazorca no encontrados" };
      }
      const afectaciones_mazorcaUpdated = await AfectacionMazorca.update(id, {
        ...data,
      });

      return {
        message: "Mazorca datos actualizado",
        afectaciones_mazorcaUpdated,
      };
    } catch (error) {
      return { message: "Error al actualizar Afectaciones de Mazorca", error };
    }
  };

  findAllAfectacionesMazorca = async (): Promise<
    AfectacionMazorca[] | { message: string }
  > => {
    const all_afectaciones_mazorca = await AfectacionMazorca.find();
    if (all_afectaciones_mazorca.length === 0) {
      return { message: "No hay registros de Estado Mazorca aun..." };
    }
    return all_afectaciones_mazorca;
  };

  deleteAfectacionesMazorca = async (id: number): Promise<any> => {
    try {
      const afectaciones_mazorca = await AfectacionMazorca.findOne({
        where: { id: id },
      });
      if (!afectaciones_mazorca) {
        return { message: "Afectaciones Mazorca data not found" };
      }
      await AfectacionMazorca.delete({ id: id });
      return {
        afectaciones_mazorca,
        message: "afectacion de Mazorca data deleted",
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error deleting Afectacion de Mazorca data",
        error: error,
      };
    }
  };
}
