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

export { api } from './api/client';
export {
  listMuscles,
  getMuscle,
  createMuscle,
  updateMuscle,
  deleteMuscle,
} from './api/muscles';
export type { ApiResponse } from './api/client';
