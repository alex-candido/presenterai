import { RoleType, StatusType } from '@prisma/client';
import { z } from 'zod';

export const adminUserInputSchema = z.object({
  name: z.string().min(1, 'Name is required').nullable(),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  emailVerified: z.boolean().optional(),
  role: z.nativeEnum(RoleType),
  status: z.nativeEnum(StatusType),
});

export type AdminUserInput = z.infer<typeof adminUserInputSchema>;
