import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Consulta } from '../consultas/consulta.entity';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true, length: 14 })
  cpf: string;

  @Column({ length: 15, nullable: true })
  telefone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'date', nullable: true })
  dataNascimento: string;

  @Column({ length: 255, nullable: true })
  endereco: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @OneToMany(() => Consulta, (consulta) => consulta.paciente)
  consultas: Consulta[];
}
