import { Request, Response } from "express";
import { Cultivo, Parcela, Productor, TipoParcela } from "../entities";
import { ProductorInterface } from "../interfaces";
import {
  CreateTipoParcela_dto,
  UpdateTipoParcela_dto,
} from "../Dtos/tipo_parcela_dto";

export class TipoParcelaService {
  createTipoParcela = async (data: CreateTipoParcela_dto) => {
    try {
      const new_Tipo_parcela = new TipoParcela();
      new_Tipo_parcela.descripcion = data.descripcion;
      await new_Tipo_parcela.save();
      return {
        id: new_Tipo_parcela.id,
        descripcion: new_Tipo_parcela.descripcion,
        fecha_create: new_Tipo_parcela.fecha_create,
        fecha_update: new_Tipo_parcela.fecha_update,
      };
    } catch (error) {
      return { message: "Error al crear el Tipo de Parcela", error: error };
    }
  };

  updateTipoParcela = async (id: number, data: UpdateTipoParcela_dto) => {
    try {
      const tipo_parcela = await TipoParcela.findOne({ where: { id: id } });
      if (!tipo_parcela) {
        throw new Error("Tipo de Parcela no encontrado");
      }
      const tipo_parcela_updated = await TipoParcela.update(id, { ...data });

      return {
        tipo_parcela_updated,
      };
    } catch (error) {
      `Error al actualizar Tipo de Parcela", error: ${(error as any).message}`;
    }
  };

  findAllTipoParcela = async () => {
    const all_Tipo_parcelas = await TipoParcela.find();
    if (!all_Tipo_parcelas || all_Tipo_parcelas.length === 0) {
      throw new Error("No hay registros de Tipos de Parcela creados...");
    }
    return all_Tipo_parcelas;
  };

  deleteTipoParcela = async (id: number) => {
    try {
      const tipo_parcela = await TipoParcela.findOne({ where: { id: id } });
      if (!tipo_parcela) {
        throw new Error("Tipo de Parcela no encontrado");
      }
      await TipoParcela.delete({ id: id });
      return {
        tipo_parcela,
      };
    } catch (error) {
      console.log("error", error);
      throw new Error(
        `Error deleting Tipo de Parcela", error: ${(error as any).message}`
      );
    }
  };
}
