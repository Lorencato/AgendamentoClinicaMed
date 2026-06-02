import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
  ) {}

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepo.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.pacienteRepo.findOne({ where: { id } });
    if (!paciente) throw new NotFoundException(`Paciente #${id} não encontrado`);
    return paciente;
  }

  async create(dto: CreatePacienteDto): Promise<Paciente> {
    const existe = await this.pacienteRepo.findOne({ where: { cpf: dto.cpf } });
    if (existe) throw new ConflictException('CPF já cadastrado');
    const paciente = this.pacienteRepo.create(dto);
    return this.pacienteRepo.save(paciente);
  }

  async update(id: number, dto: UpdatePacienteDto): Promise<Paciente> {
    const paciente = await this.findOne(id);
    Object.assign(paciente, dto);
    return this.pacienteRepo.save(paciente);
  }

  async remove(id: number): Promise<void> {
    const paciente = await this.findOne(id);
    await this.pacienteRepo.remove(paciente);
  }
}
