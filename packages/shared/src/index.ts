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

export {
  SetSchema,
  CreateSetSchema,
  UpdateSetSchema,
} from './schemas/set';
export type {
  Set,
  CreateSetInput,
  UpdateSetInput,
} from './schemas/set';

export {
  SerieSchema,
  CreateSerieSchema,
  UpdateSerieSchema,
  SerieTypeSchema,
} from './schemas/serie';
export type {
  Serie,
  CreateSerieInput,
  UpdateSerieInput,
} from './schemas/serie';

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

export {
  listSets,
  getSet,
  createSet,
  updateSet,
  deleteSet,
} from './api/sets';

export {
  listSeries,
  createSerie,
  updateSerie,
  deleteSerie,
} from './api/series';
export type { ApiResponse } from './api/client';
