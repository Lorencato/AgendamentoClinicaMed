import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
export declare class PacientesController {
    private readonly pacientesService;
    constructor(pacientesService: PacientesService);
    findAll(): Promise<import("./paciente.entity").Paciente[]>;
    findOne(id: number): Promise<import("./paciente.entity").Paciente>;
    create(dto: CreatePacienteDto): Promise<import("./paciente.entity").Paciente>;
    update(id: number, dto: UpdatePacienteDto): Promise<import("./paciente.entity").Paciente>;
    remove(id: number): Promise<void>;
}
