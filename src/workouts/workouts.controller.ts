import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  async create(@Body() dto: CreateWorkoutDto) {
    return await this.workoutsService.create(dto);
  }

  @Get()
  async getAll() {
    return await this.workoutsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.workoutsService.getOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateWorkoutDto) {
    return await this.workoutsService.update(id, dto);
  }

  @Post(':id/finish')
  async finish(@Param('id') id: number) {
    return await this.workoutsService.finish(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.workoutsService.remove(id);
  }
}
