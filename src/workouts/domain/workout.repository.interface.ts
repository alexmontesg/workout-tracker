import type { EntityManager } from 'typeorm';
import { Workout } from '../workout.entity';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { UpdateWorkoutDto } from '../dto/update-workout.dto';

export const WORKOUT_REPOSITORY = 'WORKOUT_REPOSITORY';

export interface IWorkoutRepository {
  findAll(): Promise<Workout[]>;
  findById(id: number): Promise<Workout | null>;
  create(dto: CreateWorkoutDto, entityManager?: EntityManager): Promise<Workout>;
  update(
    workout: Workout,
    dto: UpdateWorkoutDto,
    entityManager?: EntityManager,
  ): Promise<Workout>;
  remove(workout: Workout, entityManager?: EntityManager): Promise<Workout>;
}
