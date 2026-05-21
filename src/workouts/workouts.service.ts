import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { IWorkoutRepository } from './domain/workout.repository.interface';
import { WORKOUT_REPOSITORY } from './domain/workout.repository.interface';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { assertNotFinished } from '../common/guards/workout-state.guard';

@Injectable()
export class WorkoutsService {
  constructor(
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: IWorkoutRepository,
  ) {}

  private getDefaultName(date: Date): string {
    const str = String(date);
    const datePart = str.includes('T') ? str.split('T')[0] : str;
    return `Workout on ${datePart}`;
  }

  async getAll() {
    return await this.workoutRepository.findAll();
  }

  async getOne(id: number) {
    const workout = await this.workoutRepository.findById(id);
    if (!workout) throw new NotFoundException(`Workout #${id} not found`);
    return workout;
  }

  async create(dto: CreateWorkoutDto) {
    const name = dto.name?.trim() || this.getDefaultName(dto.date);
    return await this.workoutRepository.create({ ...dto, name });
  }

  async update(id: number, dto: UpdateWorkoutDto) {
    const workout = await this.getOne(id);
    assertNotFinished(workout);
    return await this.workoutRepository.update(workout, dto);
  }

  async remove(id: number) {
    const workout = await this.getOne(id);
    return await this.workoutRepository.remove(workout);
  }

  async finish(id: number) {
    const workout = await this.getOne(id);
    workout.endDate = new Date();
    return await this.workoutRepository.update(workout, {});
  }
}
