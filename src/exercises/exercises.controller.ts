import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { MusclesEnum } from './exercise.entity';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  async getAllExercises() {
    return await this.exercisesService.getAllExercises();
  }

  @Get('search')
  async search(@Query('muscle') muscle: MusclesEnum) {
    return await this.exercisesService.search({ muscle });
  }

  @Post()
  async createExercise(@Body() exercise: CreateExerciseDto) {
    return await this.exercisesService.createExercise(exercise);
  }
}
