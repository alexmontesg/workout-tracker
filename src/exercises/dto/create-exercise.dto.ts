import { ExerciseTrackingType } from '../exercise.entity';

export class CreateExerciseDto {
  name!: string;
  muscleIds!: number[];
  type!: ExerciseTrackingType;
}
