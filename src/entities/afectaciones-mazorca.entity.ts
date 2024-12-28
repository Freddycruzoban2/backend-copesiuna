import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Mazorca } from "./mazorca.entity";
import { Plantas } from "./planta.entity";

// AfectacionMazorca Entity
@Entity("afectaciones_mazorcas")
export class AfectacionMazorca extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @OneToMany(() => Mazorca, (mazorca) => mazorca.afectacion, {
    cascade: true,
    onDelete: "CASCADE",
  })
  mazorcas!: Mazorca[];

  @OneToMany(() => Plantas, (planta) => planta.afectacion, {
    cascade: true,
    onDelete: "CASCADE",
  })
  plantas!: Plantas[];
}
