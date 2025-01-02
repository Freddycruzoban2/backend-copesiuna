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

export class LoadDataService {
  CreateBitacoraSuelo = async (
    ID_user: number,
    data: CreateBitacoraSuelo_dto
  ): Promise<any> => {
    const newAnalisisSuelo = new AnalisisSuelo();
    const canProceed = await checkUserAssignments(ID_user);
      if (!canProceed) {
        throw new Error("No tiene Asignaciones de Productor");
      }
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

    // Buscar el productor
    const productor = await Productor.findOneBy({ id: data.productor_id });
    if (!productor) {
      throw new Error("El productor no existe");
    }
    

    try {
      // Crear nuevo análisis de suelo
      newAnalisisSuelo.productor = productor;
      newAnalisisSuelo.fecha_levantamiento = data.fecha_levantamiento;
      newAnalisisSuelo.fecha_e_laboratorio = data.fecha_laboratorio;
      newAnalisisSuelo.descripcion = data.descripcion || "Descripción por defecto"; // Proporcionar un valor por defecto si no se proporciona uno

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
        `Error al crear la bitácora Analiis de suelo: ${(error as any).message}`
      );
    }
  };

  CreateBitacoraCosecha = async (
    ID_user: number,
    data: CreateBitacoraEstimacionCosechaDto
  ): Promise<any> => {
    const newEstimacionCosecha = new EstimacionCosecha();

    try {
      const canProceed = await checkUserAssignments(ID_user);
      if (!canProceed) {
        throw new Error("No tiene Asignaciones de Productor");
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
        throw new Error("Parcela data not found");
      }

      const productor = await Productor.findOneBy({
        id: data.ID_productor,
      });
      if (!productor) {
        throw new Error("Productor data not found");
      }

      // Crear la Estimación de Cosecha
      newEstimacionCosecha.estado_clima = data.estadoClima;
      newEstimacionCosecha.fecha_create = data.fecha_created;
      newEstimacionCosecha.parcela = parcela;
      await newEstimacionCosecha.save();

      // // Preparar las plantas para bulk insert
      // const plantasToInsert = await Promise.all(
      //   data.plantas.map(async (planta) => {
      //     let afectacion = null;
      //     if (planta.ID_afectacion) {
      //       afectacion = await AfectacionMazorca.findOneBy({
      //         id: planta.ID_afectacion,
      //       });
      //       // if (!afectacion) {
      //       //   // Crear una nueva afectación si no se encuentra
      //       //   afectacion = new AfectacionMazorca();
      //       //   afectacion.estado = planta.estadoAfectacion; // Asume que tienes un campo estadoAfectacion en los datos
      //       //   await afectacion.save();
      //       // }
      //     }
      //     return {
      //       num_planta: planta.numeroPlanta,
      //       ID_afectacion: planta.ID_afectacion,
      //       ID_parcela: parcela.id,
      //       ID_estimacion: newEstimacionCosecha.id,
      //     };
      //   })
      // );

      // const plantasResult = await Plantas.insert(plantasToInsert);

      // // 3. Preparar las mazorcas para bulk insert
      // const mazorcasToInsert: {
      //   cantidad: number;
      //   ID_Afectacion: number;
      //   ID_planta: number;
      // }[] = [];

      // data.plantas.forEach((planta, index) => {
      //   const idPlanta = plantasResult.identifiers[index].id; // Obtener el ID de la planta insertada
      //   planta.mazorcas.forEach((mazorca) => {
      //     mazorcasToInsert.push({
      //       cantidad: mazorca.cantidad,
      //       ID_Afectacion: mazorca.ID_afectacion,
      //       ID_planta: idPlanta,
      //     });
      //   });
      // });

      data.plantas.map(async (data) => {
        const plantaRegistro = new Plantas()
        plantaRegistro.num_planta = data.numeroPlanta
        plantaRegistro.ID_afectacion = data.ID_afectacion
        plantaRegistro.ID_estimacion = newEstimacionCosecha.id,
        plantaRegistro.ID_parcela = parcela.id
        await plantaRegistro.save()
        let mazorcaCantidad = data.mazorcas.map((data) => {
          return data.cantidad
        })
        let mazorcaAfectacion = data.mazorcas.map((data) => {
          return data.ID_afectacion
        })

        const mazoraRegistro = new Mazorca()
        mazoraRegistro.cantidad = mazorcaCantidad[0]
        mazoraRegistro.ID_afectacion = mazorcaAfectacion[0]
        mazoraRegistro.ID_planta = plantaRegistro.id
        await mazoraRegistro.save();
      });

      // if (mazorcasToInsert.length > 0) {
      //   await Mazorca.insert(mazorcasToInsert);
      // }

      await AsignacionTP.update(
        { ID_productor: productor.id },
        { estado: true }
      );

      return {
        message:
          "Estimación de cosecha guardada exitosamente con plantas y mazorcas",
      };
    } catch (error) {
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
