import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './medico.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepo: Repository<Medico>,
  ) {}

  async findAll(): Promise<Medico[]> {
    return this.medicoRepo.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<Medico> {
    const medico = await this.medicoRepo.findOne({ where: { id } });
    if (!medico) throw new NotFoundException(`Médico #${id} não encontrado`);
    return medico;
  }

  async create(dto: CreateMedicoDto): Promise<Medico> {
    const existe = await this.medicoRepo.findOne({ where: { crm: dto.crm } });
    if (existe) throw new ConflictException('CRM já cadastrado');
    const medico = this.medicoRepo.create(dto);
    return this.medicoRepo.save(medico);
  }

  async update(id: number, dto: UpdateMedicoDto): Promise<Medico> {
    const medico = await this.findOne(id);
    Object.assign(medico, dto);
    return this.medicoRepo.save(medico);
  }

  async remove(id: number): Promise<void> {
    const medico = await this.findOne(id);
    await this.medicoRepo.remove(medico);
  }
}
