import { Exercise } from '../exercise.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';
import { SearchExerciseDto } from '../dto/search-exercise.dto';
import { Muscle } from '../../muscles/muscle.entity';

export const EXERCISE_REPOSITORY = 'EXERCISE_REPOSITORY';

export interface IExerciseRepository {
  findAll(): Promise<Exercise[]>;
  search(criteria: SearchExerciseDto): Promise<Exercise[]>;
  findById(id: number): Promise<Exercise | null>;
  create(dto: CreateExerciseDto): Promise<Exercise>;
  update(exercise: Exercise, dto: UpdateExerciseDto): Promise<Exercise>;
  remove(exercise: Exercise): Promise<Exercise>;
  findByIds(ids: number[]): Promise<Muscle[]>;
}
