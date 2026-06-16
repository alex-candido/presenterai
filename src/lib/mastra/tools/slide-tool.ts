// src/lib/mastra/tools/slide-tool.ts

import { slidesSchema } from "@/schemas/app/presentation-schema";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const slideTool = createTool({
  id: "create_slides",
  description: "Validates the generated slide scenes. Pass the slides as a JSON array in `items`.",
  inputSchema: z.object({ items: slidesSchema }),
  outputSchema: slidesSchema,
  execute: async ({ context }) => {
    return context.items;
  },
});
