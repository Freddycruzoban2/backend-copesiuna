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
import { CreateParcela_dto } from "../Dtos/parcelas_dto";
import { CreateCultivo_dto } from "../Dtos/cultivo_dto";
import { Role } from "../common/enum/role.enum";
import { TipoAsignacion } from "../common/enum/tipo-asignacion.role";

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
    const productor_data = [
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

    // Cultivo data seed
    const cultivo_data= [
      {
        cultivo: "cacao",
        edad: "2 meses",
      },
    ];
    await Cultivo.insert(cultivo_data)

    // Tipo Parcela data seed
    const tipo_parcela_data = [
      {
        descripcion: "parcela abierta",
      },
      {
        descripcion: "parcela cerrada",
      },
    ];
    await Parcela.insert(tipo_parcela_data)

    // Parcela data seed
    const parcela_data = [
      {
        descripcion: "parcela de cacao",
        tamaño_parcela: "2 mz",
        ID_productor: 1,
        ID_cultivo: 1,
        ID_tipo_parcela: 1
      },
      {
        descripcion: "parcela de cacao",
        tamaño_parcela: "2 mz",
        ID_productor: 2,
        ID_cultivo: 1,
        ID_tipo_parcela: 1
      },
      {
        descripcion: "parcela de cacao",
        tamaño_parcela: "2 mz",
        ID_productor: 3,
        ID_cultivo: 1,
        ID_tipo_parcela: 1
      },
      {
        descripcion: "parcela de cacao",
        tamaño_parcela: "2 mz",
        ID_productor: 4,
        ID_cultivo: 1,
        ID_tipo_parcela: 1
      }
    ];
    await Parcela.insert(parcela_data)

    const password = await argon.hash("12345678")
    // User data seed
    const userdata = [
      {
        nombre: "Admin 1",
        apellido: "Primero",
        email: "admin@gmail.com",
        role: Role.Admin,
        password: await argon.hash("12345678"),
      },
      {
        nombre: "Tecnico 1",
        apellido: "Primero",
        email: "tecnico@gmail.com",
        role: Role.TECNICO,
        password: password,
      },
    ];
    await User.insert(userdata);

    // Asignacion TP data seed
    const asignacionTP_data = [{
      ID_productor: 1,
      ID_user: 2,
      tipo: TipoAsignacion.ESTIMACION_COSECHA,
    }]
    await AsignacionTP.insert(asignacionTP_data)

    return { message: "Base de datos reseteada y rellenada con datos" };

  };
}
