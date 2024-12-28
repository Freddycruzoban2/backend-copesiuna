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
import { AsignacionTP } from "./asignacion-productorTecnico.entity";

// Productor Entity
@Entity("productor")
export class Productor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column()
  direccion!: string;

  @Column({ nullable: true })
  cedula!: string;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @OneToMany(() => Parcela, (parcela) => parcela.productor, { cascade: true, onDelete: "CASCADE" })
  parcelas!: Parcela[];

  @OneToMany(() => AnalisisSuelo, (analisis) => analisis.productor, { cascade: true, onDelete: "CASCADE" })
  analisis!: AnalisisSuelo[];

  @OneToMany(() => AsignacionTP, (asignacion) => asignacion.productor, { cascade: true, onDelete: "CASCADE" })
  asignacion!: AsignacionTP[];
}
