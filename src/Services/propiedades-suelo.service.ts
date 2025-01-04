import { Request, Response } from "express";
import { AnalisisSuelo, PropiedadesSuelo } from "../entities";
import { PropiedadesSueloInterface } from "../interfaces";
import {
  CreatePropiedadesSuelo_dto,
  UpdatePropiedadesSuelo_dto,
} from "../Dtos/propiedades_suelo_dto";
import { NotFoundException } from "../common/utils";
import { Not } from "typeorm";

export class PropiedadesSueloService {
  createPropiedadesSuelo = async (data: CreatePropiedadesSuelo_dto) => {
    const analisis = await AnalisisSuelo.findOne({
      where: { id: data.id_analisis_suelo },
    });
    if (!analisis) {
      throw new NotFoundException("Analisis Suelo data not found");
    }

    try {
      const new_propiedades_suelo = new PropiedadesSuelo();
      new_propiedades_suelo.nombre = data.nombre;
      new_propiedades_suelo.dato = data.dato;
      new_propiedades_suelo.analisis = data.analisis;
      await new_propiedades_suelo.save();
      return new_propiedades_suelo;
    } catch (error: any) {
      throw new Error(
        `Error al crear Propiedades de Suelo: "${error.message}"`
      );
    }
  };

  updatePropiedadesSuelo = async (
    id: number,
    data: UpdatePropiedadesSuelo_dto
  ) => {
    const propiedades_suelo = await PropiedadesSuelo.findOne({
      where: { id: id },
    });
    if (!propiedades_suelo) {
      throw new NotFoundException("Propiedades Suelo data not found");
    }

    try {
      const propiedades_sueloUpdated = await PropiedadesSuelo.update(id, {
        ...data,
      });

      return {
        message: "Propiedades Suelo datos actualizado",
        propiedades_sueloUpdated,
      };
    } catch (error: any) {
      throw new Error(
        `Error al actualizar Propiedades Suelo: "${(error as any).message}"`
      );
    }
  };

  findAllPropiedadesSuelo = async () => {
    const all_propiedades_suelo = await PropiedadesSuelo.find();
    if (all_propiedades_suelo.length === 0) {
      throw new NotFoundException("Propiedades Suelo data not found");
    }
    return all_propiedades_suelo;
  };

  deletePropiedadesSuelo = async (id: number) => {
    const propiedades_suelo = await PropiedadesSuelo.findOne({
      where: { id: id },
    });
    if (!propiedades_suelo) {
      throw new NotFoundException("Afectaciones Mazorca data not found");
    }

    try {
      await PropiedadesSuelo.delete({ id: id });
      return {
        propiedades_suelo,
        message: "Propiedades Suelo data deleted",
      };
    } catch (error: any) {
      console.log("error", error);
      throw new Error(
        `Error al eliminar Propiedades Suelo: "${(error as any).message}"`
      );
    }
  };
}
