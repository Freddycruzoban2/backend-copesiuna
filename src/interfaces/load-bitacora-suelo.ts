import { number } from "mathjs"

export interface BitacoraSueloInterface {
    tectura: string,
    color: string,
    ph: string,
    nitrogen: string,
    potassium: string,
    aluminum: string,
    calcium: string,
    ferric_iron: string,
    humus: string,
    magnecium: string,
    nitrite_nitrogeno: string,
    sulfate: string,
    fecha_levantamiento: Date,
    fecha_laboratorio: Date,
    productor: {
        nombre: string,
        direccion: string,
        cedula: string,
        fecha_create: Date,
        fecha_update: Date | null,
    }
};