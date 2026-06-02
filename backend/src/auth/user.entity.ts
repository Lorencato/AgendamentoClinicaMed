import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column()
  senha: string;

  @Column({ default: 'recepcionista' })
  perfil: string; // 'admin' | 'recepcionista'

  @CreateDateColumn()
  criadoEm: Date;
}