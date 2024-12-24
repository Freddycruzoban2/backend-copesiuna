import { Productor } from "../../entities";

export interface ProductorDataRetorn{
    message?: string;
    error?: any;
    status?: number;
    productor?: Productor | null;
    newProductor?: Productor;
}
