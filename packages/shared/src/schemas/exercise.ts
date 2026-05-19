import { z } from 'zod';
import { MuscleSchema } from './muscle';

export const ExerciseTrackingTypeSchema = z.enum([
  'time',
  'weight_reps',
  'bodyweight_reps',
  'distance',
  'assisted',
]);

export const ExerciseTrackingTypeLabel: Record<
  z.infer<typeof ExerciseTrackingTypeSchema>,
  string
> = {
  time: 'Time',
  weight_reps: 'Weight & Reps',
  bodyweight_reps: 'Bodyweight & Reps',
  distance: 'Distance',
  assisted: 'Assisted',
};

export const ExerciseSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  type: ExerciseTrackingTypeSchema,
  muscles: z.array(MuscleSchema),
});

export const CreateExerciseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: ExerciseTrackingTypeSchema,
  muscleIds: z.array(z.number()).min(1, 'At least one muscle is required'),
});

export const UpdateExerciseSchema = z.object({
  name: z.string().min(1).optional(),
  type: ExerciseTrackingTypeSchema.optional(),
  muscleIds: z.array(z.number()).min(1).optional(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;
export type CreateExerciseInput = z.infer<typeof CreateExerciseSchema>;
export type UpdateExerciseInput = z.infer<typeof UpdateExerciseSchema>;
