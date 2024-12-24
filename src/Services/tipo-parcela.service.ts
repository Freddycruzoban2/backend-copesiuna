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
      return new_Tipo_parcela;
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
        message: "Tipo de Parcela actualizado",
        tipo_parcela_updated,
      };
    } catch (error) {
      return { message: "Error al actualizar el Tipo de Parcela", error };
    }
  };

  findAllTipoParcela = async () => {
    const all_Tipo_parcelas = await TipoParcela.find();
    if (!all_Tipo_parcelas) {
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
        message: "Tipo de Parcela deleted",
      };
    } catch (error) {
      console.log("error", error);
      return { message: "Error deleting Tipo de Parcela", error: error };
    }
  };
}
