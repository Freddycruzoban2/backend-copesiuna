import jwt from "jsonwebtoken";
import argon from "argon2";
import "dotenv/config";
import { Request, Response } from "express";
import {
  AfectacionMazorca,
  AnalisisSuelo,
  AsignacionTP,
  Cultivo,
  DetalleAnalisisSuelo,
  DetalleEstimacionCosecha,
  EstimacionCosecha,
  Mazorca,
  Parcela,
  Plantas,
  Productor,
  PropiedadesSuelo,
  TipoParcela,
  User,
} from "../entities";
import { getRepository, QueryFailedError } from "typeorm";
import { UserInterface } from "../interfaces";
import { CreateUser_dto, LoginUser_dto } from "../Dtos/user_dto";
import { CreateProductor_dto } from "../Dtos/productor_dto";

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

  resetAndFillData = async () => {
    const afectacionMazorcaRepository = getRepository(AfectacionMazorca);
    const analisis_sueloRepository = getRepository(AnalisisSuelo);
    const estimacion_cosechaRepository = getRepository(EstimacionCosecha);
    const AsignacionTPRepository = getRepository(AsignacionTP);
    const cultivoRepository = getRepository(Cultivo);
    const userRepository = getRepository(User);
    const detalleAnalisisRepository = getRepository(DetalleAnalisisSuelo);
    const detalleEstimacionCosechaRepository = getRepository(
      DetalleEstimacionCosecha
    );
    const mazorcaRepository = getRepository(Mazorca);
    const parcelaRepository = getRepository(Parcela);
    const productorRepository = getRepository(Productor);
    const propiedadesSueloRepository = getRepository(PropiedadesSuelo);
    const tipoparcelaRepository = getRepository(TipoParcela);
    const plantasRepository = getRepository(Plantas);
    // Eliminar datos existentes
    await afectacionMazorcaRepository.clear();
    await estimacion_cosechaRepository.clear();
    await AsignacionTPRepository.clear();
    await analisis_sueloRepository.clear();
    await cultivoRepository.clear();
    await userRepository.clear();
    await detalleAnalisisRepository.clear();
    await detalleEstimacionCosechaRepository.clear();
    await mazorcaRepository.clear();
    await parcelaRepository.clear();
    await productorRepository.clear();
    await propiedadesSueloRepository.clear();
    await tipoparcelaRepository.clear();
    await plantasRepository.clear();

    const dataMazorcas = [
      "monilla",
      "phytophthora",
      "ardillas",
      "cuyú",
      "pajaro",
      "monos",
    ];
    const dataPlantas = [
      "gallina ciega o tecorón",
      "antracnosis",
      "zompopo",
      "comejen",
      "chinche",
      "mal de machete",
      "gusano",
      "hormiga",
    ];
    dataMazorcas.map(async (data) => {
      await AfectacionMazorca.create({
        nombre: data,
        descripcion: "mazorcas",
      });
    });

    dataPlantas.map(async (data) => {
      await AfectacionMazorca.create({
        nombre: data,
        descripcion: "plantas",
      });
    });

    // Productor data seed
    const productor_data: CreateProductor_dto = [
      {
        nombre: "Productor 1",
        apellido: "Primero",
        direccion: "Comunidad cerro negro",
        cedula: "xxxx xxxx",
      },
      {
        nombre: "Productor 2",
        apellido: "Segundo",
        direccion: "Comunidad cerro negro",
        cedula: "xxxx xxxx",
      },
      {
        nombre: "Productor 3",
        apellido: "Tercero",
        direccion: "Comunidad cerro negro",
        cedula: "xxxx xxxx",
      },
      {
        nombre: "Productor 4",
        apellido: "Cuarto",
        direccion: "Comunidad cerro negro",
        cedula: "xxxx xxxx",
      },
    ];
    await Productor.insert(productor_data);

    // User data seed
    const userdata: CreateUser_dto = [
      {
        nombre: "Admin 1",
        apellido: "Primero",
        email: "admin@gmail.com",
        role: "ADMIN",
        password: await argon.hash("12345678"),
      },
      {
        nombre: "Tecnico 1",
        apellido: "Primero",
        email: "tecnico@gmail.com",
        role: "TECNICO",
        password: await argon.hash("12345678"),
      },
    ];
    await User.insert(userdata);
  };
}
