import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HorarioService } from './horario.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@ApiTags('horarios')
@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo horario' })
  @ApiResponse({ status: 201, description: 'Horario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horarioService.create(createHorarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los horarios' })
  @ApiResponse({ status: 200, description: 'Lista de horarios con sus relaciones (grupo, aula, módulo)' })
  findAll() {
    return this.horarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un horario por ID' })
  @ApiResponse({ status: 200, description: 'Horario encontrado' })
  @ApiResponse({ status: 404, description: 'Horario no encontrado' })
  findOne(@Param('id') id: string) {
    return this.horarioService.findOne(+id);
  }

  @Get('grupo/:grupoId')
  @ApiOperation({ summary: 'Obtener horarios por ID de grupo' })
  @ApiResponse({ status: 200, description: 'Lista de horarios del grupo con sus relaciones (grupo, aula, módulo)' })
  findByGrupoId(@Param('grupoId') grupoId: string) {
    return this.horarioService.findByGrupoId(+grupoId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un horario' })
  @ApiResponse({ status: 200, description: 'Horario actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Horario no encontrado' })
  update(@Param('id') id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
    return this.horarioService.update(+id, updateHorarioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un horario' })
  @ApiResponse({ status: 204, description: 'Horario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Horario no encontrado' })
  remove(@Param('id') id: string) {
    return this.horarioService.remove(+id);
  }
}