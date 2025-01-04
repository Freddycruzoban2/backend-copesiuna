import { Request, Response } from "express";
import { AnalisisSuelo, DetalleAnalisisSuelo, Productor } from "../entities";
import { DetalleAnalisisSueloInterface } from "../interfaces";
import {
  CreateDetalleAnalisisSuelo_dto,
  UpdateDetalleAnalisisSuelo_dto,
} from "../Dtos/detalle_analisis_suelo_dto";
import { NotFoundException } from "../common/utils";

export class DetalleAnalisisSueloService {
  createDetalleAnalisisSuelo = async (data: CreateDetalleAnalisisSuelo_dto) => {
    const analisis = await AnalisisSuelo.findOne({
      where: { id: data.id_analisis },
    });
    if (!analisis) {
      throw new NotFoundException(`Analisis de Suelo no encontrado`);
    }

    try {
      const new_detalle_analisis_suelo = new DetalleAnalisisSuelo();
      new_detalle_analisis_suelo.analisis = analisis;
      new_detalle_analisis_suelo.descripcion = data.descripcion;
      await new_detalle_analisis_suelo.save();

      return new_detalle_analisis_suelo;
    } catch (error: any) {
      throw new Error(
        `Error al crear Detalle de Analisis Suelo: ${error.message}`
      );
    }
  };

  UpdateDetalleAnalisisSuelo = async (
    id: number,
    data: UpdateDetalleAnalisisSuelo_dto
  ) => {
    const detalle_analisis_suelo = await DetalleAnalisisSuelo.findOne({
      where: { id: id },
    });
    if (!detalle_analisis_suelo) {
      throw new NotFoundException(
        "datos de Detalle Analisis Suelo no encontrados"
      );
    }

    try {
      const detalle_analisis_sueloUpdated = await DetalleAnalisisSuelo.update(
        id,
        { ...data }
      );

      return {
        detalle_analisis_sueloUpdated,
      };
    } catch (error: any) {
      throw new Error(`Error al Detalle Analisis Suelo: ${error.message}`);
    }
  };

  findAllDetalleAnalisisSuelo = async () => {
    const all_detalle_analisis_suelo = await DetalleAnalisisSuelo.find();
    if (all_detalle_analisis_suelo.length === 0) {
      throw new NotFoundException(
        "No hay registros de Detalle Analisis Suelo Aaun..."
      );
    }
    return all_detalle_analisis_suelo;
  };

  deleteDetalleAnalisisSuelo = async (id: number) => {
    const detalle_analisis_suelo = await DetalleAnalisisSuelo.findOne({
      where: { id: id },
    });
    if (!detalle_analisis_suelo) {
      throw new NotFoundException("Detalle de Analisis Suelo data not found");
    }

    try {
      await DetalleAnalisisSuelo.delete({ id: id });
      return {
        detalle_analisis_suelo,
      };
    } catch (error: any) {
      console.log("error", error);
      throw new Error(
        `Error deleting Detalle Analisis suelo data: ${error.message}`
      );
    }
  };
}
