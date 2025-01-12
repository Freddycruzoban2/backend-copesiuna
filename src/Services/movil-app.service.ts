import { Request, Response } from "express";
import {
  AfectacionMazorca,
  AnalisisSuelo,
  AsignacionTP,
  EstimacionCosecha,
  Mazorca,
  Parcela,
  Plantas,
  Productor,
  PropiedadesSuelo,
} from "../entities";
import { BitacoraSueloInterface } from "../interfaces";
import {
  CreateBitacoraEstimacionCosechaDto,
  CreateBitacoraSuelo_dto,
} from "../Dtos/load_bitacoras_dto";
import { checkUserAssignments } from "../helpers";
import { TipoAsignacion } from "../common/enum/tipo-asignacion.role";
import {
  BadRequestException,
  CustomException,
  NotFoundException,
} from "../common/utils";

export class LoadDataService {
  CreateBitacoraSuelo = async (
    ID_user: number,
    data: CreateBitacoraSuelo_dto
  ): Promise<any> => {
    const newAnalisisSuelo = new AnalisisSuelo();
    const propiedades = [
      { nombre: "tectura", dato: data.tectura },
      { nombre: "color", dato: data.color },
      { nombre: "ph", dato: data.ph },
      { nombre: "nitrogen", dato: data.nitrogen },
      { nombre: "potassium", dato: data.potassium },
      { nombre: "aluminum", dato: data.aluminum },
      { nombre: "calcium", dato: data.calcium },
      { nombre: "ferric_iron", dato: data.ferric_iron },
      { nombre: "humus", dato: data.humus },
      { nombre: "magnecium", dato: data.magnecium },
      { nombre: "nitrite_nitrogeno", dato: data.nitrite_nitrogeno },
      { nombre: "sulfate", dato: data.sulfate },
    ];
    const canProceed = await checkUserAssignments(
      ID_user,
      TipoAsignacion.ANALISIS_FISICO_CLINICO
    );
    if (!canProceed) {
      throw new BadRequestException(
        `No tiene Asignaciones de tipo: "${TipoAsignacion.ANALISIS_FISICO_CLINICO}"`
      );
    }

    // Buscar el productor
    const productor = await Productor.findOneBy({ id: data.productor_id });
    if (!productor) {
      throw new NotFoundException("El productor no existe");
    }

    try {
      // Crear nuevo análisis de suelo
      newAnalisisSuelo.productor = productor;
      newAnalisisSuelo.fecha_levantamiento = data.fecha_levantamiento;
      newAnalisisSuelo.fecha_e_laboratorio = data.fecha_laboratorio;
      newAnalisisSuelo.descripcion =
        data.descripcion || "Descripción por defecto"; // Proporcionar un valor por defecto si no se proporciona uno

      await newAnalisisSuelo.save();

      // Crear propiedades de suelo
      const propiedadesSuelo = propiedades.map((prop) => {
        const newPropiedad = new PropiedadesSuelo();
        newPropiedad.nombre = prop.nombre;
        newPropiedad.dato = prop.dato;
        newPropiedad.analisis = newAnalisisSuelo;
        return newPropiedad;
      });

      // Guardar todas las propiedades
      await Promise.all(propiedadesSuelo.map((prop) => prop.save()));

      // Construir la respuesta
      console.log({
        tectura: data.tectura,
        color: data.color,
        ph: data.ph,
        nitrogen: data.nitrogen,
        potassium: data.potassium,
        aluminum: data.aluminum,
        calcium: data.calcium,
        ferric_iron: data.ferric_iron,
        humus: data.humus,
        magnecium: data.magnecium,
        nitrite_nitrogeno: data.nitrite_nitrogeno,
        sulfate: data.sulfate,
        fecha_levantamiento: newAnalisisSuelo.fecha_levantamiento,
        fecha_laboratorio: newAnalisisSuelo.fecha_e_laboratorio,
        productor: {
          nombre: productor.nombre,
          direccion: productor.direccion,
          cedula: productor.cedula,
          fecha_create: productor.fecha_create,
          fecha_update: productor.fecha_update,
        },
      });

      await AsignacionTP.update(
        { ID_productor: productor.id },
        { estado: true }
      );
      return {
        mensaje: "Bitacora de suelo Cargada",
      };
    } catch (error) {
      await AnalisisSuelo.delete({
        id: newAnalisisSuelo.id,
      });
      throw new Error(
        `Error al crear la bitácora Analisis de suelo: ${
          (error as any).message
        }`
      );
    }
  };

  DeleteBitacoraSuelo = async (id : number): Promise<any> => {
    const analisis = await AnalisisSuelo.findOneBy({id: id});
    if (!analisis) {
      throw new NotFoundException("Analisis de suelo no encontrado");
    }
    await AnalisisSuelo.delete({id: id});
    return {
      mensaje: "Analisis de suelo eliminado"
    }
  }

  CreateBitacoraCosecha = async (
    ID_user: number,
    data: CreateBitacoraEstimacionCosechaDto
  ): Promise<any> => {
    const newEstimacionCosecha = new EstimacionCosecha();

    const canProceed = await checkUserAssignments(
      ID_user,
      TipoAsignacion.ESTIMACION_COSECHA
    );
    if (!canProceed) {
      throw new BadRequestException(
        `No tiene Asignaciones de tipo: ${TipoAsignacion.ESTIMACION_COSECHA}`
      );
    }

    const asignaciones = await AsignacionTP.find({
      where: {
        ID_user: ID_user,
      },
    });

    const parcela = await Parcela.findOneBy({
      id: data.ID_parcela,
    });
    if (!parcela) {
      throw new NotFoundException("Parcela data not found");
    }

    const productor = await Productor.findOneBy({
      id: data.ID_productor,
    });
    if (!productor) {
      throw new NotFoundException("Productor data not found");
    }
    try {
      // Crear la Estimación de Cosecha
      newEstimacionCosecha.estado_clima = data.estadoClima;
      newEstimacionCosecha.fecha_create = data.fecha_created;
      newEstimacionCosecha.parcela = parcela;
      await newEstimacionCosecha.save();

      // Guardar plantas
      for (const plantaData of data.plantas) {
        const plantaRegistro = new Plantas();
        plantaRegistro.num_planta = plantaData.numeroPlanta;
        for (const afec of plantaData.ID_afectacion) {
          const afectacion = await AfectacionMazorca.findOneBy({
            id: afec,
          });
          if (!afectacion) {
            throw new Error("Afectacion data not found");
          }
          console.log("Imprimiendo afectacion desde planta", afectacion);
          plantaRegistro.ID_afectacion = afectacion.id;
        }
        plantaRegistro.ID_estimacion = newEstimacionCosecha.id;
        plantaRegistro.ID_parcela = parcela.id;
        await plantaRegistro.save();

        // Guardar mazorcas
        for (const mazorcaData of plantaData.mazorcas) {
          const mazorcaRegistro = new Mazorca();
          mazorcaRegistro.cantidad = mazorcaData.cantidad;
          for (const afec of mazorcaData.ID_afectacion) {
            const afectacion = await AfectacionMazorca.findOneBy({
              id: afec,
            });
            if (!afectacion) {
              throw new NotFoundException("Afectacion data not found");
            }
            mazorcaRegistro.ID_afectacion = afectacion.id;
          }
          mazorcaRegistro.ID_planta = plantaRegistro.id;
          await mazorcaRegistro.save();
        }
      }

      // Actualizar el estado de la asignación a true/realizada
      await AsignacionTP.update(
        { ID_productor: productor.id },
        { estado: true }
      );

      return {
        message:
          "Estimación de cosecha guardada exitosamente con plantas y mazorcas",
      };
    } catch (error: any) {
      console.error(error);
      // Eliminamos el registro de creado de Estimacion cosecha
      await EstimacionCosecha.delete({
        id: newEstimacionCosecha.id,
      });

      // Lanzamos un error con mensaje
      throw new Error(
        `Error al guardar la estimación de cosecha: "${(error as any).message}"`
      );
    }
  };
}
