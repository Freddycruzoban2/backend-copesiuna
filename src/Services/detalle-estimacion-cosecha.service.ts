import { Request, Response } from "express";
import {
  AnalisisSuelo,
  DetalleEstimacionCosecha,
  EstimacionCosecha,
  Parcela,
  Productor,
} from "../entities";
import {
  DetalleEstimacionCosechaInterface,
  EstimacionCosechaInterface,
} from "../interfaces";
import {
  CreateDetalleEstimacionCosecha_dto,
  UpdatetalleEstimacionCosecha_dto,
} from "../Dtos/detalle_estimacion_cosecha_dto";
import { NotFoundException } from "../common/utils";

export class DetalleEstimacionCosechaService {
  createDetalleEstimacionCosecha = async (
    data: CreateDetalleEstimacionCosecha_dto
  ) => {
    const estimacion_cosecha = await EstimacionCosecha.findOne({
      where: { id: data.id_estimacion },
    });
    if (!estimacion_cosecha) {
      throw new NotFoundException("datos de estimacion_cosecha no encontrados");
    }

    try {
      const new_detalle_estimacion_cosecha = new DetalleEstimacionCosecha();
      new_detalle_estimacion_cosecha.descripcion = data.descripcion;
      new_detalle_estimacion_cosecha.estimacion = estimacion_cosecha;
      await new_detalle_estimacion_cosecha.save();

      return new_detalle_estimacion_cosecha;
    } catch (error: any) {
      throw new Error(
        `Error al crear Detalle Estimacion Cosecha: ${error.message}`
      );
    }
  };

  updateDetalleEstimacionCosecha = async (
    id: number,
    data: UpdatetalleEstimacionCosecha_dto
  ) => {
    const detalle_estimacion_cosecha = await DetalleEstimacionCosecha.findOne({
      where: { id: id },
    });
    if (!detalle_estimacion_cosecha) {
      throw new NotFoundException(
        "datos de Detalle Estimacion Cosecha no encontrados"
      );
    }

    try {
      const detalle_estimacion_cosechaUpdated =
        await DetalleEstimacionCosecha.update(id, { ...data });

      return {
        detalle_estimacion_cosechaUpdated,
      };
    } catch (error: any) {
      throw new Error(
        `Error al actualizar datos de Detalle Estimacion Cosecha: ${error.message}`
      );
    }
  };

  findAllDetalleEstimacionCosecha = async () => {
    const all_detalle_estimacion_cosecha =
      await DetalleEstimacionCosecha.find();
    if (all_detalle_estimacion_cosecha.length === 0) {
      throw new NotFoundException(
        "No hay registros de Detalle Estimcion Cosecha Aaun..."
      );
    }
    return all_detalle_estimacion_cosecha;
  };

  deleteDetalleEstimacionCosecha = async (id: number) => {
    const detalle_estimacion_cosecha = await DetalleEstimacionCosecha.findOne({
      where: { id: id },
    });
    if (!detalle_estimacion_cosecha) {
      throw new NotFoundException("Detalle_estimacion_cosecha data not found");
    }

    try {
      await DetalleEstimacionCosecha.delete({ id: id });
      return {
        detalle_estimacion_cosecha,
      };
    } catch (error: any) {
      console.log("error", error);
      throw new Error(
        `Error deleting Detalle Estimacion Cosecha data: ${error.message}`
      );
    }
  };
}
