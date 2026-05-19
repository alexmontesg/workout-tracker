import { ExerciseTrackingType } from '../exercise.entity';

export class UpdateExerciseDto {
  name?: string;
  muscleIds?: number[];
  type?: ExerciseTrackingType;
}
