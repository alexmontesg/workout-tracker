import { z } from 'zod';

export const MuscleSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

export const CreateMuscleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const UpdateMuscleSchema = z.object({
  name: z.string().min(1).optional(),
});

export type Muscle = z.infer<typeof MuscleSchema>;
export type CreateMuscleInput = z.infer<typeof CreateMuscleSchema>;
export type UpdateMuscleInput = z.infer<typeof UpdateMuscleSchema>;
