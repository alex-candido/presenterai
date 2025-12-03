import { clientEnv } from "@/config/client-envs";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_BASE_URL,
});
