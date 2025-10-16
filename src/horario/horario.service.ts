import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Horario } from './entities/horario.entity';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Horario)
    private readonly horarioRepository: Repository<Horario>,
  ) {}

  async create(createHorarioDto: CreateHorarioDto): Promise<Horario> {
    const horario = this.horarioRepository.create(createHorarioDto);
    return await this.horarioRepository.save(horario);
  }

  async findAll(): Promise<Horario[]> {
    return await this.horarioRepository.find({
      relations: ['grupo', 'aula', 'modulo'],
    });
  }

  async findOne(id: number): Promise<Horario> {
    const horario = await this.horarioRepository.findOne({
      where: { id },
      relations: ['grupo', 'aula', 'modulo'],
    });
    if (!horario) {
      throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    }
    return horario;
  }

  async findByGrupoId(grupoId: number): Promise<Horario[]> {
    return await this.horarioRepository.find({
      where: { grupo: { id: grupoId } },
      relations: ['grupo', 'aula', 'modulo'],
    });
  }

  async update(id: number, updateHorarioDto: UpdateHorarioDto): Promise<Horario> {
    await this.findOne(id);
    await this.horarioRepository.update(id, updateHorarioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const horario = await this.findOne(id);
    await this.horarioRepository.remove(horario);
  }
}