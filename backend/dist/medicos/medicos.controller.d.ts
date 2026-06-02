import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
export declare class MedicosController {
    private readonly medicosService;
    constructor(medicosService: MedicosService);
    findAll(): Promise<import("./medico.entity").Medico[]>;
    findOne(id: number): Promise<import("./medico.entity").Medico>;
    create(dto: CreateMedicoDto): Promise<import("./medico.entity").Medico>;
    update(id: number, dto: UpdateMedicoDto): Promise<import("./medico.entity").Medico>;
    remove(id: number): Promise<void>;
}
