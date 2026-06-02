import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
export declare class PacientesService {
    private readonly pacienteRepo;
    constructor(pacienteRepo: Repository<Paciente>);
    findAll(): Promise<Paciente[]>;
    findOne(id: number): Promise<Paciente>;
    create(dto: CreatePacienteDto): Promise<Paciente>;
    update(id: number, dto: UpdatePacienteDto): Promise<Paciente>;
    remove(id: number): Promise<void>;
}
