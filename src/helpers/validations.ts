export const findEntityById = async (entity: any, id: number, entityName: string) => {
    const result = await entity.findOneBy({ id });
    if (!result) throw new Error(`${entityName} no existe`);
    return result;
};
