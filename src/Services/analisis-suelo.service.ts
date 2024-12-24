import { Request, Response } from "express";
import { AnalisisSuelo, Productor } from "../entities";
import {
  AfectacionesMazorcaInterface,
  AnalisisSueloInterface,
} from "../interfaces";
import {
  CreateAnalisisSuelo_dto,
  UpdateAnalisisSuelo_dto,
} from "../Dtos/analisis_suelo_dto";

export class AnalisisSueloService {
  createAnalisisSuelo = async (data: CreateAnalisisSuelo_dto) => {
    try {
      const productor = await Productor.findOne({
        where: { id: data.id_productor },
      });
      if (!productor) {
        return { message: "datos de Productor no encontrados" };
      }

      const new_analisis_suelo = new AnalisisSuelo();
      new_analisis_suelo.productor = productor;
      new_analisis_suelo.fecha_levantamiento = data.fecha_levantamiento;
      new_analisis_suelo.fecha_e_laboratorio = data.fecha_e_laboratorio;
      if (data.descripcion) {
        new_analisis_suelo.descripcion = data.descripcion;
      }
      await new_analisis_suelo.save();

      return new_analisis_suelo;
    } catch (error) {
      return { message: "Error al crear Analisis Suelo", error: error };
    }
  };

  UpdateAnalisisSuelo = async (id: number, data: UpdateAnalisisSuelo_dto) => {
    try {
      const analisis_suelo = await AnalisisSuelo.findOne({ where: { id: id } });
      if (!analisis_suelo) {
        return { message: "datos de Analisis Suelo no encontrados" };
      }

      const analisis_sueloUpdated = await AnalisisSuelo.update(id, { ...data });

      return {
        message: "Analisis suelo, datos actualizado",
        analisis_sueloUpdated,
      };
    } catch (error) {
      return { message: "Error al Analisis Suelo de Mazorca", error };
    }
  };

  findAllAnalisisSuelo = async () => {
    const all_analisis_suelo = await AnalisisSuelo.find({
      relations: ["productor", "propiedades"],
    });
    if (all_analisis_suelo.length === 0) {
      return { message: "No hay registros de Analisis Suelo Aaun" };
    }
    return all_analisis_suelo;
  };

  deleteAnalisisSuelo = async (id: number) => {
    try {
      const analisis_suelo = await AnalisisSuelo.findOne({ where: { id: id } });
      if (!analisis_suelo) {
        return { message: "Analisis Suelo data not found" };
      }
      await AnalisisSuelo.delete({ id: id });
      return {
        analisis_suelo,
        message: "Analisis Suelo data deleted",
      };
    } catch (error) {
      console.log("error", error);
      return { message: "Error deleting Analisis suelo data", error: error };
    }
  };
}
