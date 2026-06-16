// src/lib/mastra/workflows/slide-workflow.ts

import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from 'zod';

const generateSlidesStep = createStep({
  id: "generate-slides",
  inputSchema: z.object({}),
  outputSchema: z.object({}),
  execute: async ({ inputData, mastra }) => {

    return { };
  },
});

export const slideWorkflow = createWorkflow({
  id: "slide-workflow",
  inputSchema: z.object({}),
  outputSchema: z.object({}),
}).then(generateSlidesStep);

slideWorkflow.commit();
