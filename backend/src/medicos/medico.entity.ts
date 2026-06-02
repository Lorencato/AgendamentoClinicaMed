import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Consulta } from '../consultas/consulta.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true, length: 20 })
  crm: string;

  @Column({ length: 80 })
  especialidade: string;

  @Column({ length: 15, nullable: true })
  telefone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @OneToMany(() => Consulta, (consulta) => consulta.medico)
  consultas: Consulta[];
}
