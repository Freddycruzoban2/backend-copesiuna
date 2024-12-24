import { Request, Response } from "express";
import { AnalisisSuelo, DetalleAnalisisSuelo, Productor } from "../entities";
import { DetalleAnalisisSueloInterface } from "../interfaces";
import {
  CreateDetalleAnalisisSuelo_dto,
  UpdateDetalleAnalisisSuelo_dto,
} from "../Dtos/detalle_analisis_suelo_dto";

export class DetalleAnalisisSueloService {
  createDetalleAnalisisSuelo = async (data: CreateDetalleAnalisisSuelo_dto) => {
    try {
      const analisis = await AnalisisSuelo.findOne({
        where: { id: data.id_analisis },
      });
      if (!analisis) {
        return { message: "datos de Analisis Suelo no encontrados" };
      }

      const new_detalle_analisis_suelo = new DetalleAnalisisSuelo();
      new_detalle_analisis_suelo.analisis = analisis;
      new_detalle_analisis_suelo.descripcion = data.descripcion;
      await new_detalle_analisis_suelo.save();

      return new_detalle_analisis_suelo;
    } catch (error) {
      return { message: "Error al crear Detalle Analisis Suelo", error: error };
    }
  };

  UpdateDetalleAnalisisSuelo = async (
    id: number,
    data: UpdateDetalleAnalisisSuelo_dto
  ) => {
    try {
      const detalle_analisis_suelo = await DetalleAnalisisSuelo.findOne({
        where: { id: id },
      });
      if (!detalle_analisis_suelo) {
        return { message: "datos de Detalle Analisis Suelo no encontrados" };
      }
      const detalle_analisis_sueloUpdated = await DetalleAnalisisSuelo.update(
        id,
        { ...data }
      );

      return {
        message: "Detalle Analisis suelo, datos actualizado",
        detalle_analisis_sueloUpdated,
      };
    } catch (error) {
      return { message: "Error al Detalle Analisis Suelo", error };
    }
  };

  findAllDetalleAnalisisSuelo = async () => {
    const all_detalle_analisis_suelo = await DetalleAnalisisSuelo.find();
    if (all_detalle_analisis_suelo.length === 0) {
      return { message: "No hay registros de Detalle Analisis Suelo Aaun..." };
    }
    return all_detalle_analisis_suelo;
  };

  deleteDetalleAnalisisSuelo = async (id: number) => {
    try {
      const detalle_analisis_suelo = await DetalleAnalisisSuelo.findOne({
        where: { id: id },
      });
      if (!detalle_analisis_suelo) {
        return { message: "Analisis Suelo data not found" };
      }
      await DetalleAnalisisSuelo.delete({ id: id });
      return {
        detalle_analisis_suelo,
        message: "Detalle Analisis Suelo data deleted",
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error deleting Detalle Analisis suelo data",
        error: error,
      };
    }
  };
}
