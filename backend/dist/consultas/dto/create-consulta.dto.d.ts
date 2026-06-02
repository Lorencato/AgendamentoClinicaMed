import { StatusConsulta } from '../consulta.entity';
export declare class CreateConsultaDto {
    dataHora: string;
    pacienteId: number;
    medicoId: number;
    status?: StatusConsulta;
    observacoes?: string;
}
