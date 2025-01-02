import { AsignacionTP } from "../entities/asignacion-productorTecnico.entity";
import { AppDataSource } from "../db";

export const checkUserAssignments = async (
  userId: number
): Promise<boolean> => {
  const asignacionTPRepository = AppDataSource.getRepository(AsignacionTP);
  const asignaciones = await asignacionTPRepository.find({
    where: { ID_user: userId },
  });

  // Verificar si existen asignaciones
  if (asignaciones.length === 0) {
    return false;
  }

  // Verificar si al menos una asignación tiene el estado false
  const atLeastOneAssignmentIncomplete = asignaciones.some(
    (asignacion) => asignacion.estado === false
  );

  return atLeastOneAssignmentIncomplete;
};
