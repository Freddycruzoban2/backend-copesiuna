import { DataSource } from "typeorm";
import {
  AfectacionMazorca,
  AnalisisSuelo,
  Cultivo,
  DetalleAnalisisSuelo,
  DetalleEstimacionCosecha,
  User,
  EstimacionCosecha,
  Mazorca,
  Parcela,
  Productor,
  PropiedadesSuelo,
  TipoParcela,
  Plantas,
  AsignacionTP,
} from "../entities";
import "dotenv/config"; // Asegúrate de tener dotenv para leer las variables de entorno

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production", // sincroniza cambio de entidades a la base de datos cada que se crea conex
  logging: process.env.NODE_ENV !== "production", // muestra en la consola cada consulta que TypeORM ejecuta en la base de datos
  entities: [
    User,
    Productor,
    AfectacionMazorca,
    AnalisisSuelo,
    Cultivo,
    DetalleEstimacionCosecha,
    DetalleAnalisisSuelo,
    EstimacionCosecha,
    Mazorca,
    Plantas,
    Parcela,
    PropiedadesSuelo,
    TipoParcela,
    AsignacionTP
  ], // entida la base de datos
  migrations: [
    process.env.NODE_ENV === "production"
      ? "./dist/db/migrations/*.js"
      : "./src/db/migrations/*.ts",
  ],
  subscribers: [], // actuan como un listener, escuchan eventos y ejecutan logica cuando ocurren
});
