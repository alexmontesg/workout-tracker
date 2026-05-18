import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { Muscle } from '../muscles/muscle.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { SearchExerciseDto } from './dto/search-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @InjectRepository(Muscle)
    private readonly muscleRepository: Repository<Muscle>,
  ) {}

  async getAllExercises() {
    return await this.exerciseRepository.find({ relations: ['muscles'] });
  }

  async search({ muscleId, id }: SearchExerciseDto) {
    const qb = this.exerciseRepository
      .createQueryBuilder('exercise')
      .leftJoinAndSelect('exercise.muscles', 'muscle');

    if (id) {
      qb.andWhere('exercise.id = :id', { id });
    }

    if (muscleId) {
      const subQuery = qb
        .subQuery()
        .select('e.id')
        .from(Exercise, 'e')
        .leftJoin('e.muscles', 'm')
        .where('m.id = :muscleId')
        .getQuery();
      qb.andWhere(`exercise.id IN ${subQuery}`, { muscleId });
    }

    return await qb.getMany();
  }

  async createExercise(dto: CreateExerciseDto) {
    const { muscleIds, ...rest } = dto;
    const muscles = await this.muscleRepository.findBy({ id: In(muscleIds) });
    if (muscles.length !== muscleIds.length) {
      throw new NotFoundException('One or more muscle IDs not found');
    }
    const exercise = this.exerciseRepository.create({ ...rest, muscles });
    return await this.exerciseRepository.save(exercise);
  }
}
