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
          throw new Error("Parcela no encontrada");
        }
        newCultivo.parcela = parcela;
      }
      await newCultivo.save();
      return newCultivo;
    } catch (error: any) {
      throw new Error(`Error al crear el cultivo: ${error.message}`);
    }
  };

  updateCultivo = async (id: number, data: UpdateCultivo_dto) => {
    try {
      const cultivo = await Cultivo.findOne({ where: { id: id } });
      if (!cultivo) {
        throw new Error(`Cultivo no encontrado`);
      }
      // Actualizar el cultivo en la base de datos
      await Cultivo.update(id, { ...data });

      // Obtener el cultivo actualizado
      const cultivoUpdated = await Cultivo.findOne({ where: { id: id } });

      return {
        cultivoUpdated,
      };
    } catch (error: any) {
      throw new Error(`Error al actualizar el cultivo: ${error.message}`);
    }
  };

  findAllCultivo = async (): Promise<Cultivo[] | { message: string }> => {
    const all_cultivos = await Cultivo.find();
    if (all_cultivos.length === 0) {
      throw new Error(`No hay Cultivos registrados`);
    }
    return all_cultivos;
  };

  deleteCultivo = async (id: number) => {
    try {
      const cultivo = await Cultivo.findOne({ where: { id: id } });
      if (!cultivo) {
        throw new Error(`Cultivo no encontrado`);
      }
      await Cultivo.delete({ id: id });
      return {
        cultivo,
        message: "Cultivo deleted",
      };
    } catch (error: any) {
      console.log("error", error);
      throw new Error(`Error al eliminar el cultivo: ${error.message}`);
    }
  };
}
