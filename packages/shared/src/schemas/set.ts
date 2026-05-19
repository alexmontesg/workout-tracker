import { z } from 'zod';

export const SetSchema = z.object({
  id: z.number(),
  exerciseId: z.number(),
  timestamp: z.string(),
  notes: z.string().nullable(),
  restTimeSeconds: z.number().nullable(),
});

export const CreateSetSchema = z.object({
  exerciseId: z.number(),
  timestamp: z.string(),
  notes: z.string().optional(),
  restTimeSeconds: z.number().optional(),
});

export const UpdateSetSchema = z.object({
  exerciseId: z.number().optional(),
  timestamp: z.string().optional(),
  notes: z.string().optional(),
  restTimeSeconds: z.number().optional(),
});

export type Set = z.infer<typeof SetSchema>;
export type CreateSetInput = z.infer<typeof CreateSetSchema>;
export type UpdateSetInput = z.infer<typeof UpdateSetSchema>;
