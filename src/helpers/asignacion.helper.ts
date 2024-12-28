import { getRepository } from "typeorm";
import { AsignacionTP } from "../entities/asignacion-productorTecnico.entity";

export const checkUserAssignments = async (
  userId: number
): Promise<boolean> => {
  const asignacionTPRepository = getRepository(AsignacionTP);
  const asignaciones = await asignacionTPRepository.find({
    where: { ID_user: userId },
  });
  return asignaciones.length > 0;
};
