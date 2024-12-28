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
import { Parcela } from './parcela.entity';
import { Mazorca } from './mazorca.entity';
import { DetalleEstimacionCosecha } from './detalle-estimacion.entity';
import { Plantas } from './planta.entity';

// EstimacionCosecha Entity
@Entity('estimacion_cosecha')
export class EstimacionCosecha extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  estado_clima!: string;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @ManyToOne(() => Parcela, (parcela) => parcela.estimaciones)
  @JoinColumn({ name: 'ID_parcela' })
  parcela!: Parcela;

  @OneToMany(() => Plantas, (planta) => planta.estimacion)
  plantas!: Plantas[];

  @OneToMany(() => DetalleEstimacionCosecha, (detalle) => detalle.estimacion)
  detalles!: DetalleEstimacionCosecha[];
}