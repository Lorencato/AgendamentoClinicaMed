import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Get()
  findAll() { return this.medicosService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.medicosService.findOne(id); }

  @Post()
  create(@Body() dto: CreateMedicoDto) { return this.medicosService.create(dto); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMedicoDto) { return this.medicosService.update(id, dto); }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.medicosService.remove(id); }
}