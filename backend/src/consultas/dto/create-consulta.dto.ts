import { IsNotEmpty, IsOptional, IsString, IsInt, IsDateString, IsEnum } from 'class-validator';
import { StatusConsulta } from '../consulta.entity';

export class CreateConsultaDto {
  @IsNotEmpty({ message: 'Data e hora são obrigatórias' })
  @IsDateString()
  dataHora: string;

  @IsInt()
  @IsNotEmpty({ message: 'Paciente é obrigatório' })
  pacienteId: number;

  @IsInt()
  @IsNotEmpty({ message: 'Médico é obrigatório' })
  medicoId: number;

  @IsOptional()
  @IsEnum(StatusConsulta)
  status?: StatusConsulta;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
