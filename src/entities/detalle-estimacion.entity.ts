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
import { EstimacionCosecha } from './estimacion-cosecha.entity';

// DetalleEstimacionCosecha Entity
@Entity('detalle_estimacion_cosecha')
export class DetalleEstimacionCosecha extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @ManyToOne(() => EstimacionCosecha, (estimacion) => estimacion.detalles)
  @JoinColumn({ name: 'id_estimacion' })
  estimacion!: EstimacionCosecha;
}