import { z } from 'zod';

export const PresentationStatusEnum = z.enum(['0', '1']).transform(val => parseInt(val, 10));
export const PresentationStyleEnum = z.enum(['0', '1', '2']).transform(val => parseInt(val, 10));

export const presentationSchema = z.object({
  id: z.number(),
  uuid: z.uuid(),
  generation_id: z.number(),
  user_id: z.number(),
  title: z.string(),
  content: z.any(),
  style: PresentationStyleEnum,
  language: z.string(),
  status: PresentationStatusEnum,
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const presentationListResponseSchema = z.object({
  total: z.number(),
  count: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(),
  results: z.array(presentationSchema),
});

export type Presentation = z.infer<typeof presentationSchema>;
export type PresentationListResponse = z.infer<typeof presentationListResponseSchema>;
