import { Productor, User } from "../entities";

export interface AsignacionTPInterface {
  id: number;
  productor: Productor;
  user: User;
  estado: boolean;
  tipo: string;
}
