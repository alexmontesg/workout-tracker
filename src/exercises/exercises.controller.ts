import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  async getAllExercises() {
    return await this.exercisesService.getAllExercises();
  }

  @Post()
  async createExercise(@Body() exercise: CreateExerciseDto) {
    return await this.exercisesService.createExercise(exercise);
  }
}
