import { StatusType, VisibilityType } from '@prisma/client';
import { z } from 'zod';

export const adminDocumentInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  visibility: z.nativeEnum(VisibilityType),
  status: z.nativeEnum(StatusType),
});

export type AdminDocumentInput = z.infer<typeof adminDocumentInputSchema>;
