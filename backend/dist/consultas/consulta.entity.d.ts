import { Paciente } from '../pacientes/paciente.entity';
import { Medico } from '../medicos/medico.entity';
export declare enum StatusConsulta {
    AGENDADA = "agendada",
    REALIZADA = "realizada",
    CANCELADA = "cancelada"
}
export declare class Consulta {
    id: number;
    dataHora: Date;
    status: StatusConsulta;
    observacoes: string;
    paciente: Paciente;
    pacienteId: number;
    medico: Medico;
    medicoId: number;
    criadoEm: Date;
    atualizadoEm: Date;
}
