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
import { BadRequestException, NotFoundException } from "../common/utils";
import { Not } from "typeorm";

export class EstimacionCosechaService {
  createEstimacionCosecha = async (data: CreateEstimacionCosecha_dto) => {
    const parcela = await Parcela.findOne({
      where: { id: data.id_parcela },
    });
    if (!parcela) {
      throw new NotFoundException("datos de Productor no encontrados");
    }

    try {
      const new_estimacion_cosecha = new EstimacionCosecha();
      new_estimacion_cosecha.estado_clima = data.estado_clima;
      new_estimacion_cosecha.parcela = parcela;
      await new_estimacion_cosecha.save();

      return new_estimacion_cosecha;
    } catch (error: any) {
      throw new BadRequestException(
        `Error al crear Estimacion Cosecha: ${error.message}`
      );
    }
  };

  updateEstimacionCosecha = async (
    id: number,
    data: UpdateEstimacionCosecha_dto
  ) => {
    const estimacion_cosecha = await EstimacionCosecha.findOne({
      where: { id: id },
    });
    if (!estimacion_cosecha) {
      throw new NotFoundException("datos de Estimacion Cosecha no encontrados");
    }

    try {
      const estimacion_cosechaUpdated = await EstimacionCosecha.update(id, {
        ...data,
      });

      return {
        estimacion_cosechaUpdated,
        message: "Analisis suelo, datos actualizado",
      };
    } catch (error: any) {
      throw new Error(
        `Error al actualizar datos de Estimacion Cosecha: ${error.message}`
      );
    }
  };

  findAllEstimacionCosecha = async () => {
    const all_estimacion_cosecha = await EstimacionCosecha.find({
      relations: ["parcela", "plantas", "plantas.mazorcas"],
    });
    if (all_estimacion_cosecha.length === 0) {
      throw new NotFoundException("No hay registros de Estimcion Cosecha Aun");
    }
    return all_estimacion_cosecha;
  };

  findOneEstimacionCosecha = async (id: number) => {
    const estimacion_cosecha = await EstimacionCosecha.findOne({
      where: { id: id },
      relations: ["parcela", "plantas", "plantas.mazorcas"],
    });
    if (!estimacion_cosecha) {
      throw new NotFoundException("No existe datos de Estimacion Cosecha");
    }
    return estimacion_cosecha;
  };

  deleteEstimacionCosecha = async (id: number) => {
    const estimacion_cosecha = await EstimacionCosecha.findOne({
      where: { id: id },
    });
    if (!estimacion_cosecha) {
      throw new NotFoundException("Estimacion Cosecha data not found");
    }

    try {
      await EstimacionCosecha.delete({ id: id });
      return {
        estimacion_cosecha,
      };
    } catch (error: any) {
      console.log("error", error);
      throw new Error(
        `Error al eliminar datos de Estimacion Cosecha: ${error.message}`
      );
    }
  };
}
