import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from './consulta.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepo: Repository<Consulta>,
  ) {}

  async findAll(): Promise<Consulta[]> {
    return this.consultaRepo.find({ order: { dataHora: 'DESC' } });
  }

  async findOne(id: number): Promise<Consulta> {
    const consulta = await this.consultaRepo.findOne({ where: { id } });
    if (!consulta) throw new NotFoundException(`Consulta #${id} não encontrada`);
    return consulta;
  }

  async create(dto: CreateConsultaDto): Promise<Consulta> {
    const consulta = this.consultaRepo.create(dto);
    return this.consultaRepo.save(consulta);
  }

  async update(id: number, dto: UpdateConsultaDto): Promise<Consulta> {
    const consulta = await this.findOne(id);
    Object.assign(consulta, dto);
    return this.consultaRepo.save(consulta);
  }

  async remove(id: number): Promise<void> {
    const consulta = await this.findOne(id);
    await this.consultaRepo.remove(consulta);
  }
}
