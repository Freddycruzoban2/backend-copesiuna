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
        throw new Error(`Productor no encontrado`);
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
    } catch (error: any) {
      throw new Error(`Error al crear Analisis de Suelo: ${error.message}`);
    }
  };

  UpdateAnalisisSuelo = async (id: number, data: UpdateAnalisisSuelo_dto) => {
    try {
      const analisis_suelo = await AnalisisSuelo.findOne({ where: { id: id } });
      if (!analisis_suelo) {
        throw new Error(`Datos de Analisis de Suelo no encontrados`);
      }

      const analisis_sueloUpdated = await AnalisisSuelo.update(id, { ...data });

      return {
        analisis_sueloUpdated,
      };
    } catch (error: any) {
      throw new Error(
        `Error al actualizar Analisis de Suelo: ${error.message}`
      );
    }
  };

  findAllAnalisisSuelo = async () => {
    const all_analisis_suelo = await AnalisisSuelo.find({
      relations: ["productor", "propiedades"],
    });
    if (all_analisis_suelo.length === 0) {
      throw new Error(`No hay registros de Analisis de suelo aun`);
    }
    return all_analisis_suelo;
  };

  findOneAnalisisSuelo = async (id: number) => {
    const analisis_suelo = await AnalisisSuelo.findOne({
      where: { id: id },
      relations: ["productor", "propiedades"],
    });
    if (!analisis_suelo) {
      throw new Error(`No se encontraron datos de Analisis de suelo`);
    }
    return analisis_suelo;
  };

  deleteAnalisisSuelo = async (id: number) => {
    try {
      const analisis_suelo = await AnalisisSuelo.findOne({ where: { id: id } });
      if (!analisis_suelo) {
        throw new Error(`Datos de Analisis suelo no encontrados`);
      }
      await AnalisisSuelo.delete({ id: id });
      return {
        analisis_suelo,
      };
    } catch (error: any) {
      console.log("error", error);
      throw new Error(`Error al eliminar Analisis de suelo: ${error.message}`);
    }
  };
}
