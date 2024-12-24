import { Request, Response } from "express";
import {
  AfectacionMazorca,
  AnalisisSuelo,
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

export class LoadDataService {
  CreateBitacoraSuelo = async (data: CreateBitacoraSuelo_dto): Promise<any> => {
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

    // Fecha actual
    const fechaCreate_propiedad = new Date();

    // Buscar el productor
    const productor = await Productor.findOneBy({ id: data.productor_id });
    if (!productor) {
      throw new Error("El productor no existe");
    }

    try {
      // Crear nuevo análisis de suelo
      const newAnalisisSuelo = new AnalisisSuelo();
      newAnalisisSuelo.productor = productor;
      newAnalisisSuelo.fecha_levantamiento = data.fecha_levantamiento;
      newAnalisisSuelo.fecha_e_laboratorio = data.fecha_laboratorio;
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
      return {
        mensaje: "Bitacora de suelo Cargada",
      };
    } catch (error) {
      throw new Error(
        `Error al crear la bitácora de suelo: ${(error as any).message}`
      );
    }
  };

  CreateBitacoraCosecha = async (
    data: CreateBitacoraEstimacionCosechaDto
  ): Promise<any> => {
    try {

      const parcela = await Parcela.findOneBy({
        id: data.ID_parcela
      })
      if (!parcela) {
        return { message: "Parcela data not found" };
      }

      const productor = await Productor.findOneBy({
        id: data.ID_productor
      })
      if (!productor) {
        return { message: "Productor data not found" };
      }

      // Crear la Estimación de Cosecha
      const newEstimacionCosecha = new EstimacionCosecha();
      (newEstimacionCosecha.estado_clima = data.estadoClima),
        (newEstimacionCosecha.fecha_create = data.fecha_created),
        (newEstimacionCosecha.parcela = parcela),
        await newEstimacionCosecha.save();

      // Preparar las plantas para bulk insert
      const plantasToInsert = data.plantas.map((planta) => ({
        num_planta: planta.numeroPlanta,
        id_parcela: data.ID_parcela,
        id_estimacion: newEstimacionCosecha.id,
      }));

      const plantasResult = await Plantas.insert(plantasToInsert);

      // 3. Preparar las mazorcas para bulk insert
      const mazorcasToInsert: {
        cantidad: number;
        estado: string;
        id_planta: number;
        id_estimacion: number;
      }[] = [];
      data.plantas.forEach((planta, index) => {
        const idPlanta = plantasResult.identifiers[index].id; // Obtener el ID de la planta insertada
        planta.mazorcas.forEach((mazorca) => {
          mazorcasToInsert.push({
            cantidad: mazorca.cantidad,
            estado: mazorca.estado,
            id_planta: idPlanta,
            id_estimacion: newEstimacionCosecha.id,
          });
        });
      });

      if (mazorcasToInsert.length > 0) {
        await Mazorca.insert(mazorcasToInsert);
      }

      return {
        message:
          "Estimación de cosecha guardada exitosamente con plantas y mazorcas",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error al guardar la estimación de cosecha");
    }
  };
}
