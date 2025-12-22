import { MastraClient } from "@mastra/client-js";
import { env } from "@/env";

// The base URL for the Mastra server.
// In development, this points to the local Mastra server.
// In production, this should point to the deployed Mastra server URL.
// TODO: Create a separate env variable for this, e.g., `NEXT_PUBLIC_MASTRA_API_URL`.
const MASTRA_API_URL = "http://localhost:4111";

export const mastraClient = new MastraClient({
  baseUrl: MASTRA_API_URL,
});
