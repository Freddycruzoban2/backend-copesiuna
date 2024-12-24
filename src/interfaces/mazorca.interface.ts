import { Mazorca } from "../entities";

export interface MazorcaInterface extends Mazorca {
    cantidad: number;
    descripcion: string;
    id_estado: number;
    id_afectaciones: number;
}