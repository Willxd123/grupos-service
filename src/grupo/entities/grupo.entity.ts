import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Horario } from '../../horario/entities/horario.entity';

@Entity('grupos')
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  sigla: string;

  @Column({ type: 'integer' })
  cupo: number;

  @Column({ name: 'materia_id' })
  materiaId: number;

  @Column({ name: 'docente_id' })
  docenteId: number;

  @Column({ name: 'gestion_id' })
  gestionId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Horario, (horario) => horario.grupo)
  horarios: Horario[];
}