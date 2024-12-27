import { Request, Response } from "express";
import { User } from "../entities";
import { UserInterface } from "../interfaces";
import { CreateUser_dto, UpdateUser_Dto } from "../Dtos/user_dto";
import { ApiResponse } from "../common/types/response/api-response";

export class UserService {
  createUser = async (data: CreateUser_dto): Promise<any> => {
    try {
      const new_user = new User();
      new_user.nombre = data.nombre;
      new_user.apellido = data.apellido;
      new_user.email = data.email;
      new_user.password = data.password;
      new_user.telefono = data.telefono;
      await new_user.save();
      return new_user;
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error al crear usuario",
        error: (error as any).message,
      };
    }
  };

  updateUser = async (id: number, data: UpdateUser_Dto) => {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        return { message: "User no encontrado" };
      }
      await User.update(id, { ...data });

      const userUpdated = await User.findOne({ where: { id: id } });

      return {
        message: "User actualizado",
        userUpdated,
      };
    } catch (error) {
      console.log("error", error);
      throw new Error(`Error al actualizar el Usuario: ${(error as any).message}`);
    }
  };

  findAll = async () => {
    const all_Usuarios = await User.find();
    if (all_Usuarios.length === 0) {
      return { message: "No hay Usuarios registrados" };
    }
    return all_Usuarios;
  };

  deleteUser = async (id: number) => {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        return { message: "User not found" };
      }
      await User.delete({ id: id });
      return {
        user,
        message: "Usuario deleted",
      };
    } catch (error) {
      console.log("error", error);
      return { message: "Error deleting User", error: error };
    }
  };
}
