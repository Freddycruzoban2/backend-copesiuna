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
import { QueryFailedError } from "typeorm";
import { UserInterface } from "../interfaces";
import { CreateUser_dto, LoginUser_dto } from "../Dtos/user_dto";
import { CreateProductor_dto } from "../Dtos/productor_dto";
import { CreateParcela_dto } from "../Dtos/parcelas_dto";
import { CreateCultivo_dto } from "../Dtos/cultivo_dto";
import { Role } from "../common/enum/role.enum";
import { TipoAsignacion } from "../common/enum/tipo-asignacion.role";
import { AppDataSource } from "../db";
import { checkUserAssignments } from "../helpers";

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
  ): Promise<
    { Access_token: string; Usuario: User } | { message: string } | any
  > => {
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
      if(user.role === Role.TECNICO){
      const imprensindibleData = await AfectacionMazorca.find();
      const asignaciones = await checkUserAssignments(user.id);
      if (!asignaciones) {
        //throw new Error("No tiene Asignaciones de Productor");
        return {
          Usuario: user,
          Access_token: token,
          imprensindibleData,
          asignaciones: null,
        };
      }
     const find_allAsignacion = await AsignacionTP.find({
      where: { ID_user: user.id },
      relations: ["productor", "productor.parcelas", "productor.parcelas.tipo"],
    });

    const asig = find_allAsignacion.map((asignacion) => ({
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
          tipo: parcela.tipo
        })),
      },
      tipo: asignacion.tipo,
    }));

    return {
      Usuario: user,
      Access_token: token,
      imprensindibleData,
      asignaciones: asig,
    };
  }
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

  resetData = async () => {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }

      const queryRunner = AppDataSource.createQueryRunner();

      await queryRunner.startTransaction();
      try {
        // Desactiva las restricciones de claves foráneas temporalmente
        await queryRunner.query(`SET session_replication_role = 'replica';`);

        // Obtiene todas las tablas
        const tables = await queryRunner.query(`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
        `);

        // Vacía cada tabla
        for (const table of tables) {
          const tableName = table.table_name;
          await queryRunner.query(
            `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`
          );
        }

        // Reactiva las restricciones de claves foráneas
        await queryRunner.query(`SET session_replication_role = 'origin';`);

        await queryRunner.commitTransaction();
        console.log("Base de datos vaciada y los IDs reiniciados.");
      } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Error al vaciar la base de datos:", error);
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      console.error("Error al inicializar el datasource:", error);
      throw new Error(
        `Error al vacial la base de datos ${(error as any).message}`
      );
    }
  };

  fillData = async () => {
    try {
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

      // const propiedadesSuelo = [
      //   "tectura",
      //   "color",
      //   "ph",
      //   "nitrogen",
      //   "potassium",
      //   "aluminum",
      //   "calcium",
      //   "ferric_iron",
      //   "humus",
      //   "magnecium",
      //   "nitrite_nitrogeno",
      //   "sulfate",
      // ];

      dataMazorcas.map(async (data) => {
        const afectacionMazorca = AfectacionMazorca.create({
          nombre: data,
          descripcion: "mazorca",
        });
        await AfectacionMazorca.save(afectacionMazorca);
      });

      dataPlantas.map(async (data) => {
        const AfectacionPlanta = AfectacionMazorca.create({
          nombre: data,
          descripcion: "planta",
        });
        await AfectacionMazorca.save(AfectacionPlanta);
      });

      // propiedadesSuelo.map(async (data) => {
      //   const propiedades = PropiedadesSuelo.create({
      //     nombre: data,
      //     dato: "propiedad",
      //   });
      //   await PropiedadesSuelo.save(propiedades);
      // });

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
      const cultivo_data = [
        {
          cultivo: "cacao",
          edad: "2 meses",
        },
      ];
      await Cultivo.insert(cultivo_data);

      // Tipo Parcela data seed
      const tipo_parcela_data = [
        {
          descripcion: "parcela abierta",
        },
        {
          descripcion: "parcela cerrada",
        },
      ];
      await TipoParcela.insert(tipo_parcela_data);

      // Parcela data seed
      const parcela_data = [
        {
          descripcion: "parcela de cacao",
          tamaño_parcela: "2 mz",
          ID_productor: 1,
          ID_cultivo: 1,
          ID_tipo_parcela: 1,
        },
        {
          descripcion: "parcela de cacao",
          tamaño_parcela: "2 mz",
          ID_productor: 2,
          ID_cultivo: 1,
          ID_tipo_parcela: 1,
        },
        {
          descripcion: "parcela de cacao",
          tamaño_parcela: "2 mz",
          ID_productor: 3,
          ID_cultivo: 1,
          ID_tipo_parcela: 1,
        },
        {
          descripcion: "parcela de cacao",
          tamaño_parcela: "2 mz",
          ID_productor: 4,
          ID_cultivo: 1,
          ID_tipo_parcela: 1,
        },
      ];
      await Parcela.insert(parcela_data);

      const password = await argon.hash("12345678");
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
      const asignacionTP_data = [
        {
          ID_productor: 1,
          ID_user: 2,
          tipo: TipoAsignacion.ESTIMACION_COSECHA,
        },
        {
          ID_productor: 2,
          ID_user: 2,
          tipo: TipoAsignacion.ANALISIS_FISICO_CLINICO,
        },
      ];
      await AsignacionTP.insert(asignacionTP_data);

      return { message: "Base de datos reseteada y rellenada con datos" };
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
