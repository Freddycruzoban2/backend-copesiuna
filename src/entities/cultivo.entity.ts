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
import { Productor } from './productor';
import { Parcela } from './parcela.entity';

  // Cultivo Entity
@Entity('cultivo')
export class Cultivo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cultivo!: string;

  @Column()
  edad!: string;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @OneToOne(() => Parcela, (parcela) => parcela.cultivo, { cascade: true, onDelete: "CASCADE" })
  parcela!: Parcela; // Relación uno a uno con Parcela
}