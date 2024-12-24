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
  } from 'typeorm';
import { AnalisisSuelo } from './analisis-suelo.entity';

  // PropiedadesSuelo Entity
@Entity('propiedades_suelo')
export class PropiedadesSuelo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  dato!: string;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @ManyToOne(() => AnalisisSuelo, (analisis) => analisis.propiedades)
  @JoinColumn({ name: 'id_analisis_suelo' })
  analisis!: AnalisisSuelo;
}