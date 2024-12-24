import { Request, Response } from "express";
import {
  AnalisisSuelo,
  EstimacionCosecha,
  Parcela,
  Productor,
} from "../entities";
import {
  AfectacionesMazorcaInterface,
  AnalisisSueloInterface,
  EstimacionCosechaInterface,
} from "../interfaces";
import {
  CreateEstimacionCosecha_dto,
  UpdateEstimacionCosecha_dto,
} from "../Dtos/estimacion_cosecha_dto";

export class EstimacionCosechaService {
  createEstimacionCosecha = async (data: CreateEstimacionCosecha_dto) => {
    try {
      const parcela = await Parcela.findOne({
        where: { id: data.id_parcela },
      });
      if (!parcela) {
        return { message: "datos de Productor no encontrados" };
      }

      const new_estimacion_cosecha = new EstimacionCosecha();
      new_estimacion_cosecha.estado_clima = data.estado_clima;
      new_estimacion_cosecha.parcela = parcela;
      await new_estimacion_cosecha.save();

      return new_estimacion_cosecha;
    } catch (error) {
      return { message: "Error al crear Estimacion Cosecha", error: error };
    }
  };

  updateEstimacionCosecha = async (
    id: number,
    data: UpdateEstimacionCosecha_dto
  ) => {
    try {
      const estimacion_cosecha = await EstimacionCosecha.findOne({
        where: { id: id },
      });
      if (!estimacion_cosecha) {
        return { message: "datos de Estimacion Cosecha no encontrados" };
      }

      const estimacion_cosechaUpdated = await EstimacionCosecha.update(id, {
        ...data,
      });

      return {
        estimacion_cosechaUpdated,
        message: "Analisis suelo, datos actualizado",
      };
    } catch (error) {
      return {
        message: "Error al actualizar datos de Estimacion Cosecha",
        error,
      };
    }
  };

  findAllEstimacionCosecha = async () => {
    const all_estimacion_cosecha = await EstimacionCosecha.find({
      relations: ["parcela"],
    });
    if (all_estimacion_cosecha.length === 0) {
      return { message: "No hay registros de Estimcion Cosecha Aaun" };
    }
    return all_estimacion_cosecha;
  };

  deleteEstimacionCosecha = async (id: number) => {
    try {
      const estimacion_cosecha = await EstimacionCosecha.findOne({
        where: { id: id },
      });
      if (!estimacion_cosecha) {
        return { message: "Estimacion Cosecha data not found" };
      }
      await EstimacionCosecha.delete({ id: id });
      return {
        message: "Estimacion Cosecha data deleted",
        estimacion_cosecha,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error deleting Estimacion Cosecha data",
        error: error,
      };
    }
  };
}
