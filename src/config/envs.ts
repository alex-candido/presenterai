import { z } from "zod";

const CONFIG_ENV_SCHEMA = z.object({
  NEXT_BASE_URL_API: z.string().url(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(1),
});

export const env = CONFIG_ENV_SCHEMA.parse(process.env);