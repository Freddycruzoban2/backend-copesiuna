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
import { Parcela } from './parcela.entity';

// TipoParcela Entity
@Entity('tipo_parcela')
export class TipoParcela extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  descripcion!: string;

  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @OneToMany(() => Parcela, (parcela) => parcela.tipo, { cascade: true, onDelete: "CASCADE" })
  parcelas!: Parcela[];
}