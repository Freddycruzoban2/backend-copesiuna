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
  OneToOne,
} from "typeorm";
import { Productor } from "./productor";
import { TipoParcela } from "./tipo_parcela-entity";
import { EstimacionCosecha } from "./estimacion-cosecha.entity";
import { Cultivo } from "./cultivo.entity";
import { Plantas } from "./planta.entity";

// Parcela Entity
@Entity("parcela")
export class Parcela extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @Column()
  tamaño_parcela!: string;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @ManyToOne(() => Productor, (productor) => productor.parcelas)
  @JoinColumn({ name: "ID_productor" })
  productor!: Productor;

  @OneToOne(() => Cultivo, (cultivo) => cultivo.parcela) // Relación uno a uno
  @JoinColumn({ name: "ID_cultivo" }) // Columna que actúa como la clave foránea
  cultivo!: Cultivo; // Relación con la entidad Cultivo

  @ManyToOne(() => TipoParcela, (tipoParcela) => tipoParcela.parcelas)
  @JoinColumn({ name: "ID_tipo_parcela" })
  tipo!: TipoParcela;

  @OneToMany(() => Plantas, (planta) => planta.parcela)
  plantas!: Plantas[];

  @OneToMany(() => EstimacionCosecha, (estimacion) => estimacion.parcela)
  estimaciones!: EstimacionCosecha[];
}
