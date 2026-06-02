import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Medico } from '../medicos/medico.entity';

export enum StatusConsulta {
  AGENDADA = 'agendada',
  REALIZADA = 'realizada',
  CANCELADA = 'cancelada',
}

@Entity('consultas')
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  dataHora: Date;

  @Column({ type: 'enum', enum: StatusConsulta, default: StatusConsulta.AGENDADA })
  status: StatusConsulta;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.consultas, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pacienteId' })
  paciente: Paciente;

  @Column()
  pacienteId: number;

  @ManyToOne(() => Medico, (medico) => medico.consultas, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medicoId' })
  medico: Medico;

  @Column()
  medicoId: number;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
