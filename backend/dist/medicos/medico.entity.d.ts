import { Consulta } from '../consultas/consulta.entity';
export declare class Medico {
    id: number;
    nome: string;
    crm: string;
    especialidade: string;
    telefone: string;
    email: string;
    criadoEm: Date;
    atualizadoEm: Date;
    consultas: Consulta[];
}
