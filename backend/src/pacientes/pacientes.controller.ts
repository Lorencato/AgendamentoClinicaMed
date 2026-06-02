import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  findAll() { return this.pacientesService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.pacientesService.findOne(id); }

  @Post()
  create(@Body() dto: CreatePacienteDto) { return this.pacientesService.create(dto); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePacienteDto) { return this.pacientesService.update(id, dto); }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.pacientesService.remove(id); }
}