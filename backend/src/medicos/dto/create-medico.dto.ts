import { IsString, IsNotEmpty, IsOptional, IsEmail, Length } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Length(2, 100)
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'CRM é obrigatório' })
  crm: string;

  @IsString()
  @IsNotEmpty({ message: 'Especialidade é obrigatória' })
  especialidade: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;
}
