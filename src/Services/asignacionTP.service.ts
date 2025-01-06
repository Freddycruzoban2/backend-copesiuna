import { Request, Response } from "express";
import {
  AnalisisSuelo,
  AsignacionTP,
  Cultivo,
  Productor,
  PropiedadesSuelo,
  User,
} from "../entities";
import {
  CreateAsignacionTP_dto,
  UpdateAsignacionTP_dto,
} from "../Dtos/asignacionTP_dto";
import { Role } from "../common/enum/role.enum";
import { AsignacionTPInterface } from "../interfaces";
import { NotFoundException } from "../common/utils";

export class AsignacionTPService {
  CreateAsignacionTP = async (
    data: CreateAsignacionTP_dto
  ): Promise<AsignacionTPInterface> => {
    // Buscar el productor
    const productor = await Productor.findOneBy({ id: data.ID_productor });
    if (!productor) {
      throw new Error("El productor no existe");
    }

    const productorAsingned = await AsignacionTP.findOneBy({
      productor: { id: data.ID_productor },
    });
    if (productorAsingned) {
      throw new Error("El productor ya esta asignado");
    }

    // Buscar el Tecnico
    const tecnico = await User.findOneBy({
      id: data.ID_user,
      role: Role.TECNICO,
    });
    if (!tecnico) {
      throw new Error("El Tecnico no existe");
    }

    try {
      // Crear una nueva Asignacion
      const newAsignacionTP = new AsignacionTP();
      newAsignacionTP.productor = productor;
      newAsignacionTP.user = tecnico;
      newAsignacionTP.tipo = data.tipo;
      await newAsignacionTP.save();
      return {
        id: newAsignacionTP.id,
        productor: newAsignacionTP.productor,
        user: newAsignacionTP.user,
        estado: newAsignacionTP.estado,
        tipo: newAsignacionTP.tipo,
      };
    } catch (error) {
      throw new Error(
        `Error al crear la AsicnacionTP de suelo: ${(error as any).message}`
      );
    }
  };

  UpdateAsignacionTP = async (
    id: number,
    data: UpdateAsignacionTP_dto
  ): Promise<AsignacionTPInterface> => {
    // Buscar la asignación existente
    const updateAsignacion = await AsignacionTP.findOneBy({ id: id });
    if (!updateAsignacion) {
      throw new Error("La Asignación no existe");
    }

    // Buscar el productor si se proporciona
    if (data.ID_productor) {
      const productor = await Productor.findOneBy({ id: data.ID_productor });
      if (!productor) {
        throw new Error("El Productor no existe");
      }
      updateAsignacion.productor = productor;
    }

    // Buscar el técnico si se proporciona
    if (data.ID_user) {
      const tecnico = await User.findOneBy({
        id: data.ID_user,
        role: Role.TECNICO,
      });
      if (!tecnico) {
        throw new Error("El técnico no existe");
      }
      updateAsignacion.user = tecnico;
    }

    // Actualizar otros campos proporcionados
    if (data.estado) {
      updateAsignacion.estado = data.estado;
    }

    // Guardar la asignación actualizada
    await updateAsignacion.save();

    return updateAsignacion;
  };

  DeleteAsignacionTP = async (id: number): Promise<AsignacionTPInterface> => {
    // Buscar la asignación existente
    const deleteAsignacion = await AsignacionTP.findOneBy({ id: id });
    if (!deleteAsignacion) {
      throw new Error("La Asignación no existe");
    }

    // Eliminar la asignación
    await deleteAsignacion.remove();
    return deleteAsignacion;
  };

  FindAllMeAsignacionTP = async (id: number): Promise<any> => {
    // Buscar asignaciones existentes
    const find_allAsignacion = await AsignacionTP.find({
      where: { ID_user: id },
      relations: ["productor", "productor.parcelas", "user"],
    });
    if (find_allAsignacion.length === 0) {
      throw new NotFoundException("No tiene Asignaciones aun...");
    }

    const asignaciones = find_allAsignacion.map((asignacion) => ({
      id: asignacion.id,
      productor: {
        id: asignacion.productor.id,
        nombre: asignacion.productor.nombre,
        apellido: asignacion.productor.apellido,
        direccion: asignacion.productor.direccion,
        cedula: asignacion.productor.cedula,
        parcelas: asignacion.productor.parcelas.map((parcela) => ({
          id: parcela.id,
          nombre: parcela.descripcion,
          tamaño: parcela.tamaño_parcela,
        })),
      },
      tipo: asignacion.tipo,
      estado: asignacion.estado,
      fecha_create: asignacion.fecha_create,
      fecha_update: asignacion.fecha_update,
    }));

    return {
      asignaciones,
    };
  };

  FindAllAsignacionTP = async (): Promise<any> => {
    // Buscar asignaciones existentes
    const find_allAsignacion = await AsignacionTP.find({
      relations: ["productor", "productor.parcelas", "user"],
    });
    if (find_allAsignacion.length === 0) {
      throw new NotFoundException("No hay registros de  Asignaciones aun...");
    }

    const asignaciones = find_allAsignacion.map((asignacion) => ({
      id: asignacion.id,
      tecnico: asignacion.user,
      productor: {
        id: asignacion.productor.id,
        nombre: asignacion.productor.nombre,
        apellido: asignacion.productor.apellido,
        direccion: asignacion.productor.direccion,
        cedula: asignacion.productor.cedula,
        parcelas: asignacion.productor.parcelas.map((parcela) => ({
          id: parcela.id,
          nombre: parcela.descripcion,
          tamaño: parcela.tamaño_parcela,
        })),
      },
      tipo: asignacion.tipo,
      estado: asignacion.estado,
      fecha_create: asignacion.fecha_create,
      fecha_update: asignacion.fecha_update,
    }));

    return {
      asignaciones,
    };
  };

  FindOneAsignacionTP = async (id: number): Promise<AsignacionTPInterface[]> => {
    // Buscar asignaciones existentes
    const find_oneAsignacion = await AsignacionTP.find({
      where: {
        ID_user: id
      }
    });
    if (find_oneAsignacion.length === 0) {
      throw new NotFoundException("No hay asignaciones a ese Tecnico...");
    }
    return find_oneAsignacion;
  };
}
