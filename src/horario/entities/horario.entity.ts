import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Grupo } from '../../grupo/entities/grupo.entity';
import { Aula } from '../../aula/entities/aula.entity';
import { Modulo } from '../../modulo/entities/modulo.entity';

@Entity('horarios')
export class Horario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  dia: string;

  @Column({ type: 'time', name: 'hora_inicio' })  
  horaInicio: string;

  @Column({ type: 'time', name: 'hora_fin' })     
  horaFin: string;

  @Column({ name: 'grupo_id' })
  grupoId: number;

  @Column({ name: 'aula_id' })
  aulaId: number;

  @Column({ name: 'modulo_id' })
  moduloId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Grupo, (grupo) => grupo.horarios)
  @JoinColumn({ name: 'grupo_id' })
  grupo: Grupo;

  @ManyToOne(() => Aula, (aula) => aula.horarios)
  @JoinColumn({ name: 'aula_id' })
  aula: Aula;

  @ManyToOne(() => Modulo, (modulo) => modulo.horarios)
  @JoinColumn({ name: 'modulo_id' })
  modulo: Modulo;
}