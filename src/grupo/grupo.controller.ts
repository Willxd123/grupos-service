import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GrupoService } from './grupo.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

@ApiTags('grupos')
@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo grupo' })
  @ApiResponse({ status: 201, description: 'Grupo creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.grupoService.create(createGrupoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los grupos' })
  @ApiResponse({ status: 200, description: 'Lista de grupos' })
  findAll() {
    return this.grupoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un grupo por ID' })
  @ApiResponse({ status: 200, description: 'Grupo encontrado' })
  @ApiResponse({ status: 404, description: 'Grupo no encontrado' })
  findOne(@Param('id') id: string) {
    return this.grupoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un grupo' })
  @ApiResponse({ status: 200, description: 'Grupo actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Grupo no encontrado' })
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.grupoService.update(+id, updateGrupoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un grupo' })
  @ApiResponse({ status: 204, description: 'Grupo eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Grupo no encontrado' })
  remove(@Param('id') id: string) {
    return this.grupoService.remove(+id);
  }

  //selecionar materias
  @Get('materia/:materiaId')
  @ApiOperation({ summary: 'Obtener grupos por materia' })
  @ApiResponse({ status: 200, description: 'Lista de grupos de la materia' })
  findByMateria(@Param('materiaId') materiaId: string) {
    return this.grupoService.findByMateria(+materiaId);
  }
}
