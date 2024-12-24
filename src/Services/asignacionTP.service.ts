import { Request, Response } from "express";
import {
  AnalisisSuelo,
  AsignacionTP,
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

export class AsignacionTPService {
  CreateAsignacionTP = async (
    data: CreateAsignacionTP_dto
  ): Promise<AsignacionTPInterface> => {
    // Buscar el productor
    const productor = await Productor.findOneBy({ id: data.ID_productor });
    if (!productor) {
      throw new Error("El productor no existe");
    }

    // Buscar el Tecnico
    const tecnico = await User.findOneBy({
      id: data.ID_user,
      role: Role.TECNICO,
    });
    if (!tecnico) {
      throw new Error("El productor no existe");
    }

    try {
      // Crear una nueva Asignacion
      const newAsignacionTP = new AsignacionTP();
      newAsignacionTP.productor = productor;
      newAsignacionTP.user = tecnico;
      await newAsignacionTP.save();
      return {
        id: newAsignacionTP.id,
        productor: newAsignacionTP.productor,
        user: newAsignacionTP.user,
        estado: newAsignacionTP.estado,
      };
    } catch (error) {
      throw new Error(
        `Error al crear la bitácora de suelo: ${(error as any).message}`
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

  FindAllAsignacionTP = async (): Promise<AsignacionTPInterface[]> => {
    // Buscar asignaciones existentes
    const find_allAsignacion = await AsignacionTP.find();
    if (find_allAsignacion.length = 0) {
      throw new Error("No hay Asignaciones aun...");
    }
    return find_allAsignacion;
  };

  FindOneAsignacionTP = async (id: number): Promise<AsignacionTPInterface> => {
    // Buscar asignaciones existentes
    const find_oneAsignacion = await AsignacionTP.findOneBy({
        id: id
    });
    if (!find_oneAsignacion) {
      throw new Error("No existe esa asignacion...");
    }
    return find_oneAsignacion;
  };
}
