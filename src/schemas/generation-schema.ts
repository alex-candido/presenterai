import { z } from 'zod';

export const GenerationStatusEnum = z.enum(['0', '1']).transform(val => parseInt(val, 10));
export const GenerationScopeEnum = z.enum(['0', '1']).transform(val => parseInt(val, 10));

export const generationSchema = z.object({
  id: z.number(),
  uuid: z.uuid(),
  document_id: z.number(),
  scope: GenerationScopeEnum,
  prompt: z.string(),
  outline: z.any(),
  ai_metadata: z.any(),
  status: GenerationStatusEnum,
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const generationListResponseSchema = z.object({
  total: z.number(),
  count: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(),
  results: z.array(generationSchema),
});

export type Generation = z.infer<typeof generationSchema>;
export type GenerationListResponse = z.infer<typeof generationListResponseSchema>;
