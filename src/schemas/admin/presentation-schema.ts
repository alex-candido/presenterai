import { StatusType } from '@prisma/client';
import { z } from 'zod';
import { slidesSchema } from '../app/presentation-schema';

export const adminPresentationInputSchema = z.object({
  slides: slidesSchema.optional(),
  status: z.nativeEnum(StatusType),
});

export type AdminPresentationInput = z.infer<typeof adminPresentationInputSchema>;
