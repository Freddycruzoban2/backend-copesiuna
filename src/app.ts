// Importacion de Modulos
import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  AfectacionesMazorca_route,
  AnalisisSuelo_route,
  Auth_route,
  Cultivo_route,
  DetalleAnalisisSuelo_route,
  DetalleEstimacionCosecha_route,
  EstimacionCosecha_route,
  Mazorca_route,
  Parcela_route,
  Productor_route,
  PropiedadSuelo_route,
  TipoParcela_route,
  user_route,
  LoadMovilData_route,
  AsignacionTP_route,
} from "./Routes";
import { AppDataSource } from "./db";
import { errorHandler } from "./Middlewares/error.handler";
const app = express();

// SETTINGS
const PORT = process.env.PORT || 3003;

// MIDDLEWARES
const setupMiddlewares = (app: express.Application) => {
  app.use(errorHandler); // Manejo de errores
  app.use(morgan("dev")); // Registro de solicitudes
  app.use(cors()); // Permitir CORS
  app.use(cookieParser()); // Parseo de cookies
  app.use(express.json()); // Parseo de JSON en el cuerpo de las solicitudes
  app.use(express.urlencoded({ extended: true }));
};

// USO de MIDDLEWARES
setupMiddlewares(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión exitosa a la base de datos PostgreSQL");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos", error);
    process.exit(1); // Salir del proceso si hay un error crítico
  });

/*                                                 ROUTING                                                  */
// AUTH
app.use("/auth", Auth_route);

// USERS
app.use("/api/users", user_route);

// PRODUCTORES
app.use("/api/productores", Productor_route);

// PARCELAS
app.use("/api/parcelas", Parcela_route);

// TIPO PARCELAS
app.use("/api/tipoparcelas", TipoParcela_route);

// PROPIEDADES SUELO
app.use("/api/propiedadesuelo", PropiedadSuelo_route);

// CULTIVO
app.use("/api/cultivos", Cultivo_route);

// MAZORCA
app.use("/api/mazorcas", Mazorca_route);

// AFECTACIONES MAZORCA
app.use("/api/afectacionesmazorca", AfectacionesMazorca_route);

// ESTIMACION COSECHA
app.use("/api/estimacioncosecha", EstimacionCosecha_route);

// DETALLE ESTIMACION COSECHA
app.use("/api/detalleestimacioncosecha", DetalleEstimacionCosecha_route);

// ANALISIS SUELO
app.use("/api/analisissuelo", AnalisisSuelo_route);

// DETALLE ANALISIS SUELO
app.use("/api/detalleanalisissuelo", DetalleAnalisisSuelo_route);

// Load data - App Movil
app.use("/api/loadmovil", LoadMovilData_route);

// Asignacion Tecnico - Productor
app.use("/api/asignacion", AsignacionTP_route);

// SERVER LISTENING
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
