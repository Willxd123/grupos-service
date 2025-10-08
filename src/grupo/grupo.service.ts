import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Grupo } from './entities/grupo.entity';

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
      await this.httpService
        .get(`http://localhost:3000/api/materia/${materiaId}`)
        .toPromise();
      return true;
    } catch {
      return false;
    }
  }
  private async validarDocente(materiaId: number): Promise<boolean> {
    try {
      await this.httpService
        .get(`http://localhost:3002/api/docentes/${materiaId}`)
        .toPromise();
      return true;
    } catch {
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
    await this.grupoRepository.update(id, updateGrupoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const grupo = await this.findOne(id);
    await this.grupoRepository.remove(grupo);
  }
}
