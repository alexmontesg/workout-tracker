import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SetsService } from '../sets/sets.service';
import { CreateSetDto } from '../sets/dto/create-set.dto';
import { UpdateSetDto } from '../sets/dto/update-set.dto';

@Controller('workouts/:workoutId/sets')
export class WorkoutSetsController {
  constructor(private readonly setsService: SetsService) {}

  @Get()
  async getAll(@Param('workoutId') workoutId: number) {
    return await this.setsService.getByWorkoutId(workoutId);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.setsService.getOne(id);
  }

  @Post()
  async create(
    @Param('workoutId') workoutId: number,
    @Body() dto: CreateSetDto,
  ) {
    return await this.setsService.create(workoutId, dto);
  }

  @Patch(':id')
  async update(
    @Param('workoutId') _workoutId: number,
    @Param('id') id: number,
    @Body() dto: UpdateSetDto,
  ) {
    return await this.setsService.update(id, dto);
  }

  @Delete(':id')
  async remove(
    @Param('workoutId') _workoutId: number,
    @Param('id') id: number,
  ) {
    return await this.setsService.remove(id);
  }
}
