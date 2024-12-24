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
import { Productor } from './productor';
import { DetalleAnalisisSuelo } from './detalle-analisis.entity';
import { PropiedadesSuelo } from './propiedad-suelo.entity';

  // AnalisisSuelo Entity
@Entity('analisis_suelo')
export class AnalisisSuelo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  fecha_levantamiento!: Date;

  @CreateDateColumn()
  fecha_e_laboratorio!: Date;

  @Column()
  descripcion!: string;

  @UpdateDateColumn()
  fecha_updated!: Date;

  @CreateDateColumn()
  fecha_created!: Date;

  @ManyToOne(() => Productor, (productor) => productor.analisis)
  @JoinColumn({ name: 'id_productor' })
  productor!: Productor;

  @OneToMany(() => DetalleAnalisisSuelo, (detalle) => detalle.analisis)
  detalles!: DetalleAnalisisSuelo[];

  @OneToMany(() => PropiedadesSuelo, (propiedad) => propiedad.analisis)
  propiedades!: PropiedadesSuelo[];
}