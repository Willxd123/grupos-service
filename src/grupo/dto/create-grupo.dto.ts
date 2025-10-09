import { IsNotEmpty, IsString, IsInt, IsPositive, MaxLength, Min, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateGrupoDto {
  @ApiProperty({
    description: 'Sigla del grupo',
    example: 'A',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'La sigla es obligatoria' })
  @IsString({ message: 'La sigla debe ser texto' })
  @MaxLength(255, { message: 'La sigla no puede superar los 255 caracteres' })
  sigla: string;

  @ApiProperty({
    description: 'Cupo máximo del grupo',
    example: 30,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El cupo es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El cupo debe ser un número entero' })
  @Min(1, { message: 'El cupo debe ser al menos 1' })
  cupo: number;

  @ApiProperty({
    description: 'ID de la materia (del microservicio materias-service)',
    example: 5,
  })
  @IsNotEmpty({ message: 'La materia es obligatoria' })
  @Type(() => Number)
  @IsInt({ message: 'La materia debe ser un número entero' })
  @IsPositive({ message: 'La materia debe ser un número positivo' })
  materiaId: number;

  @ApiProperty({
    description: 'ID del docente (del microservicio perfil-service)',
    example: 2,
  })
  @IsNotEmpty({ message: 'El docente es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El docente debe ser un número entero' })
  @IsPositive({ message: 'El docente debe ser un número positivo' })
  docenteId: number;

  @ApiProperty({
    description: 'ID de la gestión',
    example: 1,
  })
  @IsNotEmpty({ message: 'La gestión es obligatoria' })
  @Type(() => Number)
  @IsInt({ message: 'La gestión debe ser un número entero' })
  @IsPositive({ message: 'La gestión debe ser un número positivo' })
  gestionId: number;
}