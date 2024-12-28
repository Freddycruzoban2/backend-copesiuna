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
  } from 'typeorm';
import { AfectacionMazorca } from './afectaciones-mazorca.entity';
import { EstimacionCosecha } from './estimacion-cosecha.entity';
import { Plantas } from './planta.entity';

// Mazorca Entity
@Entity('mazorcas')
export class Mazorca extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cantidad!: number;

  @Column()
  ID_afectacion!: number;

  @Column()
  ID_planta!: number;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @ManyToOne(() => AfectacionMazorca, (afectacion) => afectacion.mazorcas)
  @JoinColumn({ name: 'ID_afectacion' })
  afectacion!: AfectacionMazorca;

  @ManyToOne(() => Plantas, (planta) => planta.mazorcas)
  @JoinColumn({ name: 'ID_planta' })
  planta!: Plantas;
}