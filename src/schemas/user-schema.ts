import { z } from 'zod';

export const UserStatusEnum = z.enum(['0', '1']).transform(val => parseInt(val, 10));
export const UserRoleEnum = z.enum(['0', '1']).transform(val => parseInt(val, 10));

export const userSchema = z.object({
  id: z.number(),
  uuid: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  role: UserRoleEnum,
  status: UserStatusEnum,
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const userListResponseSchema = z.object({
  total: z.number(),
  count: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(),
  results: z.array(userSchema),
});

export type User = z.infer<typeof userSchema>;
export type UserListResponse = z.infer<typeof userListResponseSchema>;
