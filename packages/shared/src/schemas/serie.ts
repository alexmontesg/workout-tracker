import { z } from 'zod';

export const SerieTypeSchema = z.enum([
  'warmup',
  'effective',
  'failure',
  'drop',
]);

export const SerieSchema = z.object({
  id: z.number(),
  setId: z.number(),
  type: SerieTypeSchema,
  reps: z.number().nullable(),
  weight: z.number().nullable(),
  durationSeconds: z.number().nullable(),
  meters: z.number().nullable(),
});

export const CreateSerieSchema = z.object({
  type: SerieTypeSchema,
  reps: z.number().optional(),
  weight: z.number().optional(),
  durationSeconds: z.number().optional(),
  meters: z.number().optional(),
});

export const UpdateSerieSchema = z.object({
  type: SerieTypeSchema.optional(),
  reps: z.number().optional(),
  weight: z.number().optional(),
  durationSeconds: z.number().optional(),
  meters: z.number().optional(),
});

export type Serie = z.infer<typeof SerieSchema>;
export type CreateSerieInput = z.infer<typeof CreateSerieSchema>;
export type UpdateSerieInput = z.infer<typeof UpdateSerieSchema>;
