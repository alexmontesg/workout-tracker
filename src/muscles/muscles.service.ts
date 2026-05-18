import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Muscle } from './muscle.entity';
import { Exercise } from '../exercises/exercise.entity';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';

@Injectable()
export class MusclesService {
  constructor(
    @InjectRepository(Muscle)
    private readonly muscleRepository: Repository<Muscle>,
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async findAll() {
    return await this.muscleRepository.find();
  }

  async findOne(id: number) {
    const muscle = await this.muscleRepository.findOneBy({ id });
    if (!muscle) throw new NotFoundException(`Muscle #${id} not found`);
    return muscle;
  }

  async create(dto: CreateMuscleDto) {
    return await this.muscleRepository.save(dto);
  }

  async update(id: number, dto: UpdateMuscleDto) {
    const muscle = await this.findOne(id);
    Object.assign(muscle, dto);
    return await this.muscleRepository.save(muscle);
  }

  async remove(id: number) {
    const muscle = await this.findOne(id);
    const linkedCount = await this.exerciseRepository
      .createQueryBuilder('exercise')
      .leftJoin('exercise.muscles', 'muscle')
      .where('muscle.id = :id', { id })
      .getCount();
    if (linkedCount > 0) {
      throw new ConflictException(
        `Cannot delete muscle #${id}: linked to ${linkedCount} exercise(s)`,
      );
    }
    return await this.muscleRepository.remove(muscle);
  }
}
