import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
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

  @Get(':id')
  async getExercise(@Param('id') id: number) {
    return await this.exercisesService.getExercise(id);
  }

  @Post()
  async createExercise(@Body() exercise: CreateExerciseDto) {
    return await this.exercisesService.createExercise(exercise);
  }

  @Patch(':id')
  async updateExercise(
    @Param('id') id: number,
    @Body() dto: UpdateExerciseDto,
  ) {
    return await this.exercisesService.updateExercise(id, dto);
  }

  @Delete(':id')
  async removeExercise(@Param('id') id: number) {
    return await this.exercisesService.removeExercise(id);
  }
}
