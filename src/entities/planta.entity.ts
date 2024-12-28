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
import { Mazorca } from "./mazorca.entity";
import { Parcela } from "./parcela.entity";
import { EstimacionCosecha } from "./estimacion-cosecha.entity";
import { AfectacionMazorca } from "./afectaciones-mazorca.entity";

// EstadoMazorca Entity
@Entity("plantas")
export class Plantas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  num_planta!: number;

  @Column()
  ID_afectacion!: number;

  @Column()
  ID_parcela!: number;

  @Column()
  ID_estimacion!: number;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @ManyToOne(() => AfectacionMazorca, (afectacion) => afectacion.plantas)
  @JoinColumn({ name: "ID_afectacion" })
  afectacion!: AfectacionMazorca;

  @ManyToOne(() => EstimacionCosecha, (estimacion) => estimacion.plantas)
  @JoinColumn({ name: "ID_estimacion" })
  estimacion!: EstimacionCosecha;

  @OneToMany(() => Mazorca, (mazorca) => mazorca.planta, { cascade: true, onDelete: "CASCADE" })
  mazorcas!: Mazorca[];

  @ManyToOne(() => Parcela, (parcela) => parcela.plantas)
  @JoinColumn({ name: "ID_parcela" })
  parcela!: Parcela;
}
