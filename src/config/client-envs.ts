import { z } from "zod";

const CLIENT_ENV_SCHEMA = z.object({
  NEXT_PUBLIC_BASE_URL: z.url(),
});

export const clientEnv = CLIENT_ENV_SCHEMA.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});
