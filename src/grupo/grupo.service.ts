import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Grupo } from './entities/grupo.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GrupoService {
  constructor(
    @InjectRepository(Grupo)
    private readonly grupoRepository: Repository<Grupo>,
    private readonly httpService: HttpService,
  ) {}

  async create(createGrupoDto: CreateGrupoDto): Promise<Grupo> {
    // Validar que la materia existe en materias-service
    const materiaExiste = await this.validarMateria(createGrupoDto.materiaId);
    if (!materiaExiste) {
      throw new NotFoundException('Materia no encontrada');
    }

    // Validar que el docente existe en perfil-service
    const docenteExiste = await this.validarDocente(createGrupoDto.docenteId);
    if (!docenteExiste) {
      throw new NotFoundException('Docente no encontrado');
    }

    // Si todo OK, crear el grupo
    const grupo = this.grupoRepository.create(createGrupoDto);
    return await this.grupoRepository.save(grupo);
  }

  private async validarMateria(materiaId: number): Promise<boolean> {
    try {
      const url = `http://materias-service:3000/api/materia/${materiaId}`;
      console.log('🔍 Validando materia:', url);
      
      const response = await firstValueFrom(
        this.httpService.get(url)
      );
      
      console.log('✅ Materia encontrada:', response.data);
      return true;
    } catch (error) {
      console.error('❌ Error validando materia:', error.message);
      return false;
    }
  }
  
  private async validarDocente(docenteId: number): Promise<boolean> {
    try {
      const url = `http://perfil-service:3002/api/docentes/${docenteId}`;
      console.log('🔍 Validando docente:', url);
      
      const response = await firstValueFrom(
        this.httpService.get(url)
      );
      
      console.log('✅ Docente encontrado:', response.data);
      return true;
    } catch (error) {
      console.error('❌ Error validando docente:', error.message);
      return false;
    }
  }
  
  async findAll(): Promise<Grupo[]> {
    return await this.grupoRepository.find();
  }

  async findOne(id: number): Promise<Grupo> {
    const grupo = await this.grupoRepository.findOne({ where: { id } });
    if (!grupo) {
      throw new NotFoundException(`Grupo con ID ${id} no encontrado`);
    }
    return grupo;
  }

  async update(id: number, updateGrupoDto: UpdateGrupoDto): Promise<Grupo> {
    await this.findOne(id);
  
    // Si se intenta cambiar materiaId, validar que existe
    if (updateGrupoDto.materiaId) {
      const materiaExiste = await this.validarMateria(updateGrupoDto.materiaId);
      if (!materiaExiste) {
        throw new NotFoundException('Materia no encontrada');
      }
    }
  
    // Si se intenta cambiar docenteId, validar que existe
    if (updateGrupoDto.docenteId) {
      const docenteExiste = await this.validarDocente(updateGrupoDto.docenteId);
      if (!docenteExiste) {
        throw new NotFoundException('Docente no encontrado');
      }
    }
  
    await this.grupoRepository.update(id, updateGrupoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const grupo = await this.findOne(id);
    await this.grupoRepository.remove(grupo);
  }

  //selecionar materias:
  async findByMateria(materiaId: number): Promise<any[]> {
    // Validar que la materia existe
    const materiaExiste = await this.validarMateria(materiaId);
    if (!materiaExiste) {
      throw new NotFoundException('Materia no encontrada');
    }
  
    // Obtener los grupos de esa materia
    const grupos = await this.grupoRepository.find({ 
      where: { materiaId },
      relations: ['horarios']
    });
  
    // Enriquecer cada grupo con info del docente
    const gruposEnriquecidos = await Promise.all(
      grupos.map(async (grupo) => {
        let docenteInfo = null;
  
        // Obtener info del docente
        try {
          const response = await firstValueFrom(
            this.httpService.get(`http://perfil-service:3002/api/docentes/${grupo.docenteId}`)
          );
          docenteInfo = response.data;
        } catch (error) {
          console.error(`Error al obtener docente ${grupo.docenteId}`);
        }
  
        return {
          ...grupo,
          docente: docenteInfo
        };
      })
    );
  
    return gruposEnriquecidos;
  }
}