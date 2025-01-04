import { Request, Response } from "express";
import { Cultivo, Parcela, Productor, TipoParcela } from "../entities";
import { ProductorInterface } from "../interfaces";
import { CreateParcela_dto, UpdateParcela_dto } from "../Dtos/parcelas_dto";
import { findEntityById } from "../helpers";
import { NotFoundException } from "../common/utils";

export class ParcelaService {
  createParcela = async (data: CreateParcela_dto) => {
    const {
      descripcion,
      tamaño_parcela,
      productorId,
      cultivoId,
      tipoParcelaId,
    } = data;
    const productor = await findEntityById(Productor, productorId, "Productor");
    const cultivo = await findEntityById(Cultivo, cultivoId, "Cultivo");
    const tipo_parcela = await findEntityById(
      TipoParcela,
      tipoParcelaId,
      "Tipo de Parcela"
    );
    try {
      // Crear una nueva parcela
      const new_parcela = new Parcela();
      new_parcela.descripcion = descripcion;
      new_parcela.tamaño_parcela = tamaño_parcela;
      new_parcela.productor = productor;
      new_parcela.cultivo = cultivo; // Establecer la relación uno a uno
      new_parcela.tipo = tipo_parcela;
      await new_parcela.save();

      return new_parcela;
    } catch (error: any) {
      console.error("Error al crear la parcela:", error);
      throw new Error(`Error al crear la parcela: ${error.message}`);
    }
  };

  updateParcela = async (id: number, data: UpdateParcela_dto) => {
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
      throw new NotFoundException("La parcela no existe");
    }

    try {
      // Actualizar solo las propiedades que están presentes en el cuerpo de la solicitud
      if (descripcion) parcela.descripcion = descripcion;
      if (tamaño_parcela) parcela.tamaño_parcela = tamaño_parcela;

      // Actualizar el productor solo si se pasa el ID
      if (productorId) {
        const productor = await Productor.findOneBy({ id: productorId });
        if (!productor) {
          throw new NotFoundException("El productor no existe");
        }
        parcela.productor = productor;
      }

      // Actualizar el cultivo solo si se pasa el ID
      if (cultivoId) {
        const cultivo = await Cultivo.findOneBy({ id: cultivoId });
        if (!cultivo) {
          throw new NotFoundException("El cultivo no existe");
        }
        parcela.cultivo = cultivo;
      }

      // Actualizar el tipo de parcela solo si se pasa el ID
      if (tipoParcelaId) {
        const tipo_parcela = await TipoParcela.findOneBy({ id: tipoParcelaId });
        if (!tipo_parcela) {
          throw new NotFoundException("El tipo de parcela no existe");
        }
        parcela.tipo = tipo_parcela;
      }
      // Guardar los cambios
      await parcela.save();

      return parcela;
    } catch (error: any) {
      console.error("Error al actualizar la parcela:", error);
      throw new Error(`Error al actualizar la parcela: ${error.message}`);
    }
  };

  findAllParcela = async () => {
    try {
      const all_parcelas = await Parcela.find({
        relations: ["productor", "cultivo", "tipo"],
      });
      if (!all_parcelas) {
        throw new NotFoundException("No hay datos de Parcelas Registrados");
      }

      return all_parcelas;
    } catch (error: any) {
      throw new Error(`Error al Obtener datos ${error.message}`);
    }
  };

  deleteParcela = async (id: number) => {
    const parcela = await Parcela.findOne({ where: { id: id } });
    if (!parcela) {
      throw new NotFoundException("parcela not found");
    }

    try {
      await Parcela.delete({ id: id });
      return {
        parcela,
      };
    } catch (error: any) {
      console.log("error", error);
      throw new Error(`Error al eliminar Parcela ${error.message}`);
    }
  };
}
