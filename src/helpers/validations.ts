import { NotFoundException } from "../common/utils";

export const findEntityById = async (entity: any, id: number, entityName: string) => {
    const result = await entity.findOneBy({ id });
    if (!result) throw new NotFoundException(`${entityName} no existe`);
    return result;
};
