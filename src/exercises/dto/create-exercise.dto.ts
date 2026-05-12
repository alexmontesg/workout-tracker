import { ExerciseTrackingType, MusclesEnum } from '../exercise.entity';

export class CreateExerciseDto {
  name!: string;
  muscles!: MusclesEnum[];
  type!: ExerciseTrackingType;
}
