import { z } from 'zod';

import { GenerationScope } from '@prisma/client';

export const startSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
  scope: z.nativeEnum(GenerationScope).default(GenerationScope.MULTI_PAGE),
  slideCount: z.array(z.number()).optional(),
  language: z.string().optional(),
  ratio: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export type StartSchema = z.infer<typeof startSchema>;
