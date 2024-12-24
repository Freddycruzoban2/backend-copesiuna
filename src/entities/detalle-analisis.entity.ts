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

// DetalleAnalisisSuelo Entity
@Entity('detalle_analisis_suelo')
export class DetalleAnalisisSuelo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @UpdateDateColumn()
  fecha_update!: Date;

  @ManyToOne(() => AnalisisSuelo, (analisis) => analisis.detalles)
  @JoinColumn({ name: 'id_analisis' })
  analisis!: AnalisisSuelo;
}

