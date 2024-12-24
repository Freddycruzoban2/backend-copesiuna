import { Request, Response } from "express";
import { AnalisisSuelo, PropiedadesSuelo } from "../entities";
import { PropiedadesSueloInterface } from "../interfaces";
import {
  CreatePropiedadesSuelo_dto,
  UpdatePropiedadesSuelo_dto,
} from "../Dtos/propiedades_suelo_dto";

export class PropiedadesSueloService {
  createPropiedadesSuelo = async (data: CreatePropiedadesSuelo_dto) => {
    try {
      const analisis = await AnalisisSuelo.findOne({
        where: { id: data.id_analisis_suelo },
      });
      if (!analisis) {
        return { message: "Analisis Suelo data not found" };
      }

      const new_propiedades_suelo = new PropiedadesSuelo();
      new_propiedades_suelo.nombre = data.nombre;
      new_propiedades_suelo.dato = data.dato;
      new_propiedades_suelo.analisis = data.analisis;
      await new_propiedades_suelo.save();
      return new_propiedades_suelo;
    } catch (error) {
      return { message: "Error al crear Propiedades Suelo", error: error };
    }
  };

  updatePropiedadesSuelo = async (
    id: number,
    data: UpdatePropiedadesSuelo_dto
  ) => {
    try {
      const propiedades_suelo = await PropiedadesSuelo.findOne({
        where: { id: id },
      });
      if (!propiedades_suelo) {
        return { message: "datos de Propiedades Suelo no encontrados" };
      }
      const propiedades_sueloUpdated = await PropiedadesSuelo.update(id, {
        ...data,
      });

      return {
        message: "Propiedades Suelo datos actualizado",
        propiedades_sueloUpdated,
      };
    } catch (error) {
      return {
        message: "Error al actualizar Afectaciones de Mazorca",
        error,
      };
    }
  };

  findAllPropiedadesSuelo = async () => {
    const all_propiedades_suelo = await PropiedadesSuelo.find();
    if (all_propiedades_suelo.length === 0) {
      return { message: "No hay registros de Estado Mazorca aun..." };
    }
    return all_propiedades_suelo;
  };

  deletePropiedadesSuelo = async (id: number) => {
    try {
      const propiedades_suelo = await PropiedadesSuelo.findOne({
        where: { id: id },
      });
      if (!propiedades_suelo) {
        return { message: "Afectaciones Mazorca data not found" };
      }
      await PropiedadesSuelo.delete({ id: id });
      return {
        propiedades_suelo,
        message: "Propiedades Suelo data deleted",
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error deleting Propiedades Suelo data",
        error: error,
      };
    }
  };
}
