import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { ISetRepository } from './domain/set.repository.interface';
import { SET_REPOSITORY } from './domain/set.repository.interface';
import type { IWorkoutRepository } from '../workouts/domain/workout.repository.interface';
import { WORKOUT_REPOSITORY } from '../workouts/domain/workout.repository.interface';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { assertNotFinished } from '../common/guards/workout-state.guard';

@Injectable()
export class SetsService {
  constructor(
    @Inject(SET_REPOSITORY)
    private readonly setRepository: ISetRepository,
    @Inject(WORKOUT_REPOSITORY)
    private readonly workoutRepository: IWorkoutRepository,
  ) {}

  async getByWorkoutId(workoutId: number) {
    return await this.setRepository.findByWorkoutId(workoutId);
  }

  async getOne(id: number) {
    const set = await this.setRepository.findById(id);
    if (!set) throw new NotFoundException(`Set #${id} not found`);
    return set;
  }

  async create(workoutId: number, dto: CreateSetDto) {
    const workout = await this.workoutRepository.findById(workoutId);
    if (!workout) throw new NotFoundException(`Workout #${workoutId} not found`);
    assertNotFinished(workout);
    return await this.setRepository.create({ ...dto, workoutId });
  }

  async update(id: number, dto: UpdateSetDto) {
    const set = await this.getOne(id);
    assertNotFinished(set.workout);
    if (
      dto.exerciseId !== undefined &&
      dto.exerciseId !== set.exercise.id &&
      set.series.length > 0
    ) {
      throw new BadRequestException(
        'Cannot change exercise after series have been added to the set',
      );
    }
    return await this.setRepository.update(set, dto);
  }

  async remove(id: number) {
    const set = await this.getOne(id);
    assertNotFinished(set.workout);
    return await this.setRepository.remove(set);
  }
}
