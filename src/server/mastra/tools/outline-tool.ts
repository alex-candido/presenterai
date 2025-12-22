import { createTool } from "@mastra/core";
import { z } from "zod";

import { outlinesSchema } from "@/schemas/app/generation-schema";

export const outlineTool = createTool({
  id: "save_presentation_outline",
  description:
    "Saves the generated presentation outline. Use this tool to return the final outline.",
  inputSchema: z.object({
    outlines: outlinesSchema,
  }),
  outputSchema: outlinesSchema,
  execute: async ({ context }) => {
    // This tool is used for structured data output.
    // It receives the data from the agent and returns it.
    console.log("Outline tool executed with:", context.outlines);
    return context.outlines;
  },
});
