import { z } from 'zod';
import { SetSchema } from './set';

export const WorkoutSchema = z.object({
  id: z.number(),
  date: z.string(),
  endDate: z.string().nullable(),
  name: z.string(),
  notes: z.string().nullable(),
  sets: z.array(SetSchema).optional(),
});

export const CreateWorkoutSchema = z.object({
  date: z.string().optional(),
  name: z.string().optional(),
  notes: z.string().optional(),
});

export const UpdateWorkoutSchema = z.object({
  name: z.string().optional(),
  notes: z.string().optional(),
});

export type Workout = z.infer<typeof WorkoutSchema>;
export type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>;
export type UpdateWorkoutInput = z.infer<typeof UpdateWorkoutSchema>;
