export {
  MuscleSchema,
  CreateMuscleSchema,
  UpdateMuscleSchema,
} from './schemas/muscle';
export type {
  Muscle,
  CreateMuscleInput,
  UpdateMuscleInput,
} from './schemas/muscle';

export {
  ExerciseSchema,
  CreateExerciseSchema,
  UpdateExerciseSchema,
  ExerciseTrackingTypeSchema,
  ExerciseTrackingTypeLabel,
} from './schemas/exercise';
export type {
  Exercise,
  CreateExerciseInput,
  UpdateExerciseInput,
} from './schemas/exercise';

export { api } from './api/client';
export {
  listMuscles,
  getMuscle,
  createMuscle,
  updateMuscle,
  deleteMuscle,
} from './api/muscles';

export {
  listExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
} from './api/exercises';
export type { ApiResponse } from './api/client';
