import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { SearchExerciseDto } from './dto/search-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async getAllExercises() {
    return await this.exerciseRepository.find();
  }

  async search({ muscle }: SearchExerciseDto) {
    // TODO: Need to change to make a join, this is only finding exact matches
    return await this.exerciseRepository.findBy({ muscles: muscle });
  }

  async createExercise(exercise: CreateExerciseDto) {
    return await this.exerciseRepository.save(exercise);
  }
}
