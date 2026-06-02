import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
export declare class ConsultasController {
    private readonly consultasService;
    constructor(consultasService: ConsultasService);
    findAll(): Promise<import("./consulta.entity").Consulta[]>;
    findOne(id: number): Promise<import("./consulta.entity").Consulta>;
    create(dto: CreateConsultaDto): Promise<import("./consulta.entity").Consulta>;
    update(id: number, dto: UpdateConsultaDto): Promise<import("./consulta.entity").Consulta>;
    remove(id: number): Promise<void>;
}
