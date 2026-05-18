import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { IExerciseRepository } from './domain/exercise.repository.interface';
import { EXERCISE_REPOSITORY } from './domain/exercise.repository.interface';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { SearchExerciseDto } from './dto/search-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @Inject(EXERCISE_REPOSITORY)
    private readonly exerciseRepository: IExerciseRepository,
  ) {}

  async getAllExercises() {
    return await this.exerciseRepository.findAll();
  }

  async search(criteria: SearchExerciseDto) {
    return await this.exerciseRepository.search(criteria);
  }

  async createExercise(dto: CreateExerciseDto) {
    return await this.exerciseRepository.create(dto);
  }
}
