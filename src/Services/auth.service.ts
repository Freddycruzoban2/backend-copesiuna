import jwt from "jsonwebtoken";
import argon from "argon2";
import "dotenv/config";
import { Request, Response } from "express";
import { User } from "../entities";
import { QueryFailedError } from "typeorm";
import { UserInterface } from "../interfaces";
import { CreateUser_dto, LoginUser_dto } from "../Dtos/user_dto";

export class AutenticacionService {
  signup = async (
    data: CreateUser_dto
  ): Promise<{ Access_token: string } | { message: string }> => {
    try {
      const hashedPassword = await argon.hash(data.password);
      const newUser = new User();
      newUser.nombre = data.nombre;
      newUser.apellido = data.apellido;
      newUser.telefono = data.telefono;
      newUser.email = data.email;
      if (data.role) {
        newUser.role = data.role;
      }
      newUser.password = hashedPassword;
      await newUser.save();

      const token = await this.signToken(
        newUser.id,
        newUser.email,
        newUser.role
      );

      return {
        Access_token: token,
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // Manejo de errores específicos basados en el código de error
        if (error.driverError.code === "23505") {
          // Código de restricción única en PostgreSQL
          return {
            message: "Error: Duplicate entry. Email already exists",
          };
        } else {
          return {
            message: "Error: Database query failed:",
          };
        }
      }
      return {
        message: "Error: An unexpected error occurred",
      };
    }
  };

  signin = async (
    data: LoginUser_dto
  ): Promise<{ Access_token: string; Usuario: User } | { message: string }> => {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    // si no existe retorna un error
    if (!user) throw new Error("Email is incorrect or doesn't exist");

    // comparar las contraseñas
    const pwMatches = await argon.verify(user.password, data.password);

    // si no son iguales, retorna un error
    if (!pwMatches) throw new Error("Incorrect password");

    try {
      // devuelve un token al user
      const token = await this.signToken(user.id, user.email, user.role);
      return {
        Usuario: user,
        Access_token: token,
      };
    } catch (error) {
      console.error("Error al crear respuesta:", error);
      throw new Error("Error al crear respuesta de token");
    }
  };

  signToken = async (
    userId: number,
    email: string,
    role: string
  ): Promise<string> => {
    if (role === "USER") {
      const payload = {
        sub: userId,
        email,
        role,
      };
      const Secret = process.env.JWT_SECRET as string;

      const config = {
        expiresIn: "7d",
      };

      return jwt.sign(payload, Secret, config);
    }
    const payload = {
      sub: userId,
      email,
      role,
    };
    const Secret = process.env.JWT_SECRET as string;

    const config = {
      expiresIn: "3h",
    };

    return jwt.sign(payload, Secret, config);
  };

  fillData() {
    
  }
}
