import { z } from "zod";

const SERVER_ENV_SCHEMA = z.object({
  GOOGLE_API_KEY: z.string().min(1),
  NEXT_BASE_URL_API: z.url(),
  BREVO_API_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(1),
});

export const serverEnv = SERVER_ENV_SCHEMA.safeParse(process.env);