import { Request, Response } from "express";
import { AfectacionMazorca } from "../entities";
import { AfectacionesMazorcaInterface } from "../interfaces";
import {
  CreateAfectacionesMazorca_dto,
  UpdateAfectacionesMazorca_dto,
} from "../Dtos/afectaciones_mazorca_dto";
import { NotFoundException } from "../common/utils";

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
    } catch (error: any) {
      throw new Error(`Error al crear Afectacion mazorca: ${error.message}`);
    }
  };

  updateAfectacionesMazorca = async (
    id: number,
    data: UpdateAfectacionesMazorca_dto
  ): Promise<any> => {
    const afectaciones_mazorca = await AfectacionMazorca.findOne({
      where: { id: id },
    });
    if (!afectaciones_mazorca) {
      throw new NotFoundException(`Afectacion mazorca no encontrada`);
    }
    try {
      const afectaciones_mazorcaUpdated = await AfectacionMazorca.update(id, {
        ...data,
      });

      return {
        afectaciones_mazorcaUpdated,
      };
    } catch (error: any) {
      throw new Error(
        `Error al actualizar Afectaciones Mazorca: ${error.message}`
      );
    }
  };

  findAllAfectacionesMazorca = async (): Promise<
    AfectacionMazorca[] | { message: string }
  > => {
    const all_afectaciones_mazorca = await AfectacionMazorca.find();
    if (all_afectaciones_mazorca.length === 0) {
      throw new NotFoundException(`No hay Afectaciones de Mazorca registrados`);
    }
    return all_afectaciones_mazorca;
  };

  deleteAfectacionesMazorca = async (id: number): Promise<any> => {
    const afectaciones_mazorca = await AfectacionMazorca.findOne({
      where: { id: id },
    });
    if (!afectaciones_mazorca) {
      throw new NotFoundException(`Datos de Afectaciones de Mazorca no encontrados`);
    }
    try {
      await AfectacionMazorca.delete({ id: id });
      return {
        afectaciones_mazorca,
      };
    } catch (error: any) {
      console.log("error", error);
      throw new Error(
        `Error al eliminar Afectaciones de Mazorca: ${error.message}`
      );
    }
  };
}
