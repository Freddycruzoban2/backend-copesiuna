import { Request, Response } from "express";
import { Cultivo, Parcela } from "../entities";
import { CultivoInterface } from "../interfaces";
import { CreateCultivo_dto, UpdateCultivo_dto } from "../Dtos/cultivo_dto";

export class CultivoService {
  createCultivo = async (data: CreateCultivo_dto): Promise<any> => {
    try {
      const newCultivo = new Cultivo();
      newCultivo.cultivo = data.cultivo;
      newCultivo.edad = data.edad;
      if (data.id_parcela) {
        const parcela = await Parcela.findOne({
          where: { id: data.id_parcela },
        });
        if (!parcela) {
          return { message: "Parcela no encontrada" };
        }
        newCultivo.parcela = parcela;
      }
      await newCultivo.save();
      return newCultivo;
    } catch (error) {
      return { message: "Error al crear el cultivo", error: error };
    }
  };

  updateCultivo = async (id: number, data: UpdateCultivo_dto) => {
    try {
      const cultivo = await Cultivo.findOne({ where: { id: id } });
      if (!cultivo) {
        return { message: "Cultivo no encontrado" };
      }
      // Actualizar el cultivo en la base de datos
      await Cultivo.update(id, { ...data });

      // Obtener el cultivo actualizado
      const cultivoUpdated = await Cultivo.findOne({ where: { id: id } });

      return {
        cultivoUpdated,
        message: "Cultivo actualizado",
      };
    } catch (error) {
      return { message: "Error al actualizar el cultivo", error };
    }
  };

  findAllCultivo = async (): Promise<Cultivo[] | { message: string }> => {
    const all_cultivos = await Cultivo.find();
    if (all_cultivos.length === 0) {
      return { message: "No hay Productores registrados" };
    }
    return all_cultivos;
  };

  deleteCultivo = async (id: number) => {
    try {
      const cultivo = await Cultivo.findOne({ where: { id: id } });
      if (!cultivo) {
        return { message: "cultivo not found" };
      }
      await Cultivo.delete({ id: id });
      return {
        cultivo,
        message: "Cultivo deleted",
      };
    } catch (error) {
      console.log("error", error);
      return { message: "Error deleting Cultivo", error: error };
    }
  };
}
