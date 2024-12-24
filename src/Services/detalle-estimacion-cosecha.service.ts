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

export class DetalleEstimacionCosechaService {
  createDetalleEstimacionCosecha = async (
    data: CreateDetalleEstimacionCosecha_dto
  ) => {
    try {
      const estimacion_cosecha = await EstimacionCosecha.findOne({
        where: { id: data.id_estimacion },
      });
      if (!estimacion_cosecha) {
        return { message: "datos de estimacion_cosecha no encontrados" };
      }

      const new_detalle_estimacion_cosecha = new DetalleEstimacionCosecha();
      new_detalle_estimacion_cosecha.descripcion = data.descripcion;
      new_detalle_estimacion_cosecha.estimacion = estimacion_cosecha;
      await new_detalle_estimacion_cosecha.save();

      return new_detalle_estimacion_cosecha;
    } catch (error) {
      return {
        message: "Error al crear Detalle Estimacion Cosecha",
        error: error,
      };
    }
  };

  updateDetalleEstimacionCosecha = async (
    id: number,
    data: UpdatetalleEstimacionCosecha_dto
  ) => {
    try {
      const detalle_estimacion_cosecha = await DetalleEstimacionCosecha.findOne(
        { where: { id: id } }
      );
      if (!detalle_estimacion_cosecha) {
        return {
          message: "datos de Detalle Estimacion Cosecha no encontrados",
        };
      }

      const detalle_estimacion_cosechaUpdated =
        await DetalleEstimacionCosecha.update(id, { ...data });

      return {
        message: "datos de Detalle Estimacion Cosecha actualizado",
        detalle_estimacion_cosechaUpdated,
      };
    } catch (error) {
      return {
        message: "Error al actualizar datos de Detalle Estimacion Cosecha",
        error,
      };
    }
  };

  findAllDetalleEstimacionCosecha = async () => {
    const all_detalle_estimacion_cosecha =
      await DetalleEstimacionCosecha.find();
    if (all_detalle_estimacion_cosecha.length === 0) {
      return {
        message: "No hay registros de Detalle Estimcion Cosecha Aaun...",
      };
    }
    return all_detalle_estimacion_cosecha;
  };

  deleteDetalleEstimacionCosecha = async (id: number) => {
    try {
      const detalle_estimacion_cosecha = await DetalleEstimacionCosecha.findOne(
        {
          where: { id: id },
        }
      );
      if (!detalle_estimacion_cosecha) {
        return { message: "Detalle_estimacion_cosecha data not found" };
      }
      await DetalleEstimacionCosecha.delete({ id: id });
      return {
        message: "Detalle Estimacion Cosecha data deleted",
        detalle_estimacion_cosecha,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error deleting Detalle Estimacion Cosecha data",
        error: error,
      };
    }
  };
}
