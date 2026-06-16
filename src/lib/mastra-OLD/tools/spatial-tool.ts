// src/lib/mastra/tools/spatial-tool.ts

import { spatialPlanSchema } from '@/schemas/app/spatial-schema';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const spatialTool = createTool({
  id: 'create_spatial_plan',
  description: 'Validates and returns the spatial plan (element roles, positions and sizes) for a slide.',
  inputSchema: z.object({ plan: spatialPlanSchema }),
  outputSchema: spatialPlanSchema,
  execute: async ({ context }) => {
    return context.plan;
  },
});
