import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { Parcela } from "./parcela.entity";
import { Cultivo } from "./cultivo.entity";
import { EstimacionCosecha } from "./estimacion-cosecha.entity";
import { AnalisisSuelo } from "./analisis-suelo.entity";
import { Productor } from "./productor";
import { User } from "./user.entity";

// AsignacionTP Entity
@Entity("asignacionTP")
export class AsignacionTP extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ID_productor!: number;

  @Column()
  ID_user!: number;

  @Column()
  tipo!: string;

  @Column({ default: false })
  estado!: boolean;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @ManyToOne(() => Productor, (productor) => productor.asignacion)
  @JoinColumn({ name: "ID_productor" })
  productor!: Productor;

  @ManyToOne(() => User, (user) => user.asignacion)
  @JoinColumn({ name: "ID_user" })
  user!: User;
}
