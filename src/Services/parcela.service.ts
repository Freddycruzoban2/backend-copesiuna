import { Request, Response } from "express";
import { Cultivo, Parcela, Productor, TipoParcela } from "../entities";
import { ProductorInterface } from "../interfaces";
import { CreateParcela_dto, UpdateParcela_dto } from "../Dtos/parcelas_dto";
import { findEntityById } from "../helpers";

export class ParcelaService {
  createParcela = async (data: CreateParcela_dto) => {
    try {
      const {
        descripcion,
        tamaño_parcela,
        productorId,
        cultivoId,
        tipoParcelaId,
      } = data;

      const productor = await findEntityById(
        Productor,
        productorId,
        "Productor"
      );
      const cultivo = await findEntityById(Cultivo, cultivoId, "Cultivo");
      const tipo_parcela = await findEntityById(
        TipoParcela,
        tipoParcelaId,
        "Tipo de Parcela"
      );

      // Crear una nueva parcela
      const new_parcela = new Parcela();
      new_parcela.descripcion = descripcion;
      new_parcela.tamaño_parcela = tamaño_parcela;
      new_parcela.productor = productor;
      new_parcela.cultivo = cultivo; // Establecer la relación uno a uno
      new_parcela.tipo = tipo_parcela;
      await new_parcela.save();

      return new_parcela;
    } catch (error) {
      console.error("Error al crear la parcela:", error);
      throw new Error("Error al crear la parcela");
    }
  };

  updateParcela = async (id: number, data: UpdateParcela_dto) => {
    try {
      const {
        descripcion,
        tamaño_parcela,
        productorId,
        cultivoId,
        tipoParcelaId,
      } = data;

      // Buscar la parcela por ID
      const parcela = await Parcela.findOne({
        where: { id },
        relations: ["productor", "cultivo", "tipo"],
      });

      if (!parcela) {
        throw new Error("La parcela no existe");
      }

      // Actualizar solo las propiedades que están presentes en el cuerpo de la solicitud
      if (descripcion) parcela.descripcion = descripcion;
      if (tamaño_parcela) parcela.tamaño_parcela = tamaño_parcela;

      // Actualizar el productor solo si se pasa el ID
      if (productorId) {
        const productor = await Productor.findOneBy({ id: productorId });
        if (!productor) {
          throw new Error("El productor no existe");
        }
        parcela.productor = productor;
      }

      // Actualizar el cultivo solo si se pasa el ID
      if (cultivoId) {
        const cultivo = await Cultivo.findOneBy({ id: cultivoId });
        if (!cultivo) {
          throw new Error("El cultivo no existe");
        }
        parcela.cultivo = cultivo;
      }

      // Actualizar el tipo de parcela solo si se pasa el ID
      if (tipoParcelaId) {
        const tipo_parcela = await TipoParcela.findOneBy({ id: tipoParcelaId });
        if (!tipo_parcela) {
          throw new Error("El tipo de parcela no existe");
        }
        parcela.tipo = tipo_parcela;
      }

      // Guardar los cambios
      await parcela.save();

      return parcela;
    } catch (error) {
      console.error("Error al actualizar la parcela:", error);
      throw new Error("Error al actualizar la parcela");
    }
  };

  findAllParcela = async () => {
    try {
      const all_parcelas = await Parcela.find({
        relations: ["productor", "cultivo", "tipo"],
      });

      return all_parcelas;
    } catch (error) {
      return error;
    }
  };

  deleteParcela = async (id: number) => {
    try {
      const parcela = await Parcela.findOne({ where: { id: id } });
      if (!parcela) {
        return { message: "parcela not found" };
      }
      await Parcela.delete({ id: id });
      return {
        parcela,
        message: "parcela deleted",
      };
    } catch (error) {
      console.log("error", error);
      return { message: "Error deleting parcela", error: error };
    }
  };
}
