import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async getAllExercises() {
    return await this.exerciseRepository.find();
  }

  async createExercise(exercise: CreateExerciseDto) {
    return await this.exerciseRepository.save(exercise);
  }
}
