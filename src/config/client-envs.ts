import { z } from "zod";

const CLIENT_ENV_SCHEMA = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
});

// We have to pass `process.env` here because on the client, only `NEXT_PUBLIC_` vars are available.
// A simple `parse(process.env)` would fail on the server if it has other undefined vars.
export const clientEnv = CLIENT_ENV_SCHEMA.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});
