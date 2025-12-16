import { z } from 'zod';

export const startSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

export type StartSchema = z.infer<typeof startSchema>;
