import { z } from 'zod';

export const DocumentStatusEnum = z.enum(['0', '1']).transform(val => parseInt(val, 10));
export const VisibilityEnum = z.enum(['0', '1']).transform(val => parseInt(val, 10));

export const documentSchema = z.object({
  id: z.number(),
  uuid: z.uuid(),
  user_id: z.number(),
  title: z.string(),
  visibility: VisibilityEnum,
  latest_generation_id: z.number().nullable(),
  latest_presentation_id: z.number().nullable(),
  status: DocumentStatusEnum,
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const documentListResponseSchema = z.object({
  total: z.number(),
  count: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(),
  results: z.array(documentSchema),
});

export type Document = z.infer<typeof documentSchema>;
export type DocumentListResponse = z.infer<typeof documentListResponseSchema>;
