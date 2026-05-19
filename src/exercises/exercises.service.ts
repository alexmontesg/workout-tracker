import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { IExerciseRepository } from './domain/exercise.repository.interface';
import { EXERCISE_REPOSITORY } from './domain/exercise.repository.interface';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
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

  async getExercise(id: number) {
    const exercise = await this.exerciseRepository.findById(id);
    if (!exercise) throw new NotFoundException(`Exercise #${id} not found`);
    return exercise;
  }

  async createExercise(dto: CreateExerciseDto) {
    return await this.exerciseRepository.create(dto);
  }

  async updateExercise(id: number, dto: UpdateExerciseDto) {
    const exercise = await this.getExercise(id);
    return await this.exerciseRepository.update(exercise, dto);
  }

  async removeExercise(id: number) {
    const exercise = await this.getExercise(id);
    return await this.exerciseRepository.remove(exercise);
  }
}
