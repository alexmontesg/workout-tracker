import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { IMuscleRepository } from './domain/muscle.repository.interface';
import { MUSCLE_REPOSITORY } from './domain/muscle.repository.interface';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';

@Injectable()
export class MusclesService {
  constructor(
    @Inject(MUSCLE_REPOSITORY)
    private readonly muscleRepository: IMuscleRepository,
  ) {}

  async findAll() {
    return await this.muscleRepository.findAll();
  }

  async findOne(id: number) {
    const muscle = await this.muscleRepository.findById(id);
    if (!muscle) throw new NotFoundException(`Muscle #${id} not found`);
    return muscle;
  }

  async create(dto: CreateMuscleDto) {
    return await this.muscleRepository.create(dto);
  }

  async update(id: number, dto: UpdateMuscleDto) {
    const muscle = await this.findOne(id);
    return await this.muscleRepository.update(muscle, dto);
  }

  async remove(id: number) {
    const muscle = await this.findOne(id);
    const linkedCount = await this.muscleRepository.findLinkedExerciseCount(id);
    if (linkedCount > 0) {
      throw new ConflictException(
        `Cannot delete muscle #${id}: linked to ${linkedCount} exercise(s)`,
      );
    }
    return await this.muscleRepository.remove(muscle);
  }
}
