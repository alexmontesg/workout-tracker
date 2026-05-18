import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { SearchExerciseDto } from './dto/search-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  async getAllExercises() {
    return await this.exercisesService.getAllExercises();
  }

  @Get('search')
  async search(@Query() query: SearchExerciseDto) {
    return await this.exercisesService.search(query);
  }

  @Post()
  async createExercise(@Body() exercise: CreateExerciseDto) {
    return await this.exercisesService.createExercise(exercise);
  }
}
