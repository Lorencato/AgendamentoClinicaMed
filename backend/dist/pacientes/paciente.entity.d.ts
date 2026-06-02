import { Consulta } from '../consultas/consulta.entity';
export declare class Paciente {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    dataNascimento: string;
    endereco: string;
    criadoEm: Date;
    atualizadoEm: Date;
    consultas: Consulta[];
}
