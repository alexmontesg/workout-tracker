import type { EntityManager } from 'typeorm';
import { Set } from '../set.entity';
import { CreateSetDto } from '../dto/create-set.dto';
import { UpdateSetDto } from '../dto/update-set.dto';

export const SET_REPOSITORY = 'SET_REPOSITORY';

export interface ISetRepository {
  findAll(): Promise<Set[]>;
  findById(id: number): Promise<Set | null>;
  findByWorkoutId(workoutId: number): Promise<Set[]>;
  create(
    dto: CreateSetDto & { workoutId: number },
    entityManager?: EntityManager,
  ): Promise<Set>;
  update(
    set: Set,
    dto: UpdateSetDto,
    entityManager?: EntityManager,
  ): Promise<Set>;
  remove(set: Set, entityManager?: EntityManager): Promise<Set>;
}
