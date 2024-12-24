import { MigrationInterface, QueryRunner } from "typeorm";

export class ReiniciarBaseDeDatos1634567890123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Eliminar todas las tablas
        await queryRunner.dropDatabase("COPESIUNA-DB", true);
        // Añade aquí todas las tablas que necesites eliminar

        // Vuelve a ejecutar las migraciones para recrear las tablas
        await queryRunner.createDatabase("COPESIUNA-DB", true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // No es necesario implementar el método down para esta migración
    }
}
