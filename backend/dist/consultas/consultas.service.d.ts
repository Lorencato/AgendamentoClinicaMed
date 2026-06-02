import { Repository } from 'typeorm';
import { Consulta } from './consulta.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
export declare class ConsultasService {
    private readonly consultaRepo;
    constructor(consultaRepo: Repository<Consulta>);
    findAll(): Promise<Consulta[]>;
    findOne(id: number): Promise<Consulta>;
    create(dto: CreateConsultaDto): Promise<Consulta>;
    update(id: number, dto: UpdateConsultaDto): Promise<Consulta>;
    remove(id: number): Promise<void>;
}
