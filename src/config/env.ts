import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
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
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),
  },
  runtimeEnv: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NEXT_BASE_URL_API: process.env.NEXT_BASE_URL_API,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
