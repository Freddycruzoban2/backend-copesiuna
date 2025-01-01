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

  @Column()
  ID_productor!: number;

  @Column()
  ID_cultivo!: number;

  @Column()
  ID_tipo_parcela!: number;

  @ManyToOne(() => Productor, (productor) => productor.parcelas)
  @JoinColumn({ name: "ID_productor" })
  productor!: Productor;

  @ManyToOne(() => Cultivo, (cultivo) => cultivo.parcela)
  @JoinColumn({ name: "ID_cultivo" }) 
  cultivo!: Cultivo; 

  @ManyToOne(() => TipoParcela, (tipoParcela) => tipoParcela.parcelas)
  @JoinColumn({ name: "ID_tipo_parcela" })
  tipo!: TipoParcela;

  @OneToMany(() => Plantas, (planta) => planta.parcela, { cascade: true, onDelete: "CASCADE" })
  plantas!: Plantas[];

  @OneToMany(() => EstimacionCosecha, (estimacion) => estimacion.parcela, { cascade: true, onDelete: "CASCADE" })
  estimaciones!: EstimacionCosecha[];
}
