import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Role } from "../common/enum/role.enum";
import { AsignacionTP } from "./asignacion-productorTecnico.entity";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, default: "el PEPE" })
  nombre!: string;

  @Column({ nullable: false, default: " Ramirez" })
  apellido!: string;

  @Column({ nullable: true })
  telefono!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.TECNICO,
  })
  role!: Role;

  @CreateDateColumn({ nullable: true })
  fecha_create!: Date;

  @UpdateDateColumn({ nullable: true })
  fecha_update!: Date;

  @OneToMany(() => AsignacionTP, (asignacion) => asignacion.user)
  asignacion!: AsignacionTP[];
}
