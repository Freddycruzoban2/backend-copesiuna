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
import { Mazorca } from './mazorca.entity';
import { Parcela } from './parcela.entity';
import { EstimacionCosecha } from './estimacion-cosecha.entity';

// EstadoMazorca Entity
@Entity('plantas')
export class Plantas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  num_planta!: number

  
  @Column()
  ID_parcela!: number
  
  @CreateDateColumn()
  fecha_create!: Date;

  @UpdateDateColumn()
  fecha_update!: Date;

  @ManyToOne(() => EstimacionCosecha, (estimacion) => estimacion.mazorcas)
  @JoinColumn({ name: 'ID_estimacion' })
  estimacion!: EstimacionCosecha;
  
  @OneToMany(() => Mazorca, (mazorca) => mazorca.planta)
  mazorcas!: Mazorca[];

  @ManyToOne(() => Parcela, (parcela) => parcela.plantas)
  @JoinColumn({ name: 'ID_parcela' })
  parcela!: Parcela;

}