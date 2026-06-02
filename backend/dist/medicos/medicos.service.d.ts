import { Repository } from 'typeorm';
import { Medico } from './medico.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
export declare class MedicosService {
    private readonly medicoRepo;
    constructor(medicoRepo: Repository<Medico>);
    findAll(): Promise<Medico[]>;
    findOne(id: number): Promise<Medico>;
    create(dto: CreateMedicoDto): Promise<Medico>;
    update(id: number, dto: UpdateMedicoDto): Promise<Medico>;
    remove(id: number): Promise<void>;
}
