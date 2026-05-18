import { Exercise } from '../exercise.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { SearchExerciseDto } from '../dto/search-exercise.dto';
import { Muscle } from '../../muscles/muscle.entity';

export const EXERCISE_REPOSITORY = 'EXERCISE_REPOSITORY';

export interface IExerciseRepository {
  findAll(): Promise<Exercise[]>;
  search(criteria: SearchExerciseDto): Promise<Exercise[]>;
  create(dto: CreateExerciseDto): Promise<Exercise>;
  findByIds(ids: number[]): Promise<Muscle[]>;
}
