// src/lib/mastra/tools/outline-tool.ts
// The tool schema intentionally excludes `config` and `id` —
// those fields are injected by the system after the agent runs.
// The agent only ever produces CONTENT slides — structural slides
// (COVER, SUMMARY, CLOSING) are injected by the workflow.

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const outlineItemSchema = z.object({
  order: z.string(),
  type: z.literal('CONTENT'),
  layout: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  representation: z.string(),
  concepts: z.array(z.string()),
});

const outlineItemsSchema = z.array(outlineItemSchema);

export const outlineTool = createTool({
  id: 'create_outlines',
  description: 'Generates and validates the structured skeleton of the presentation (Outlines).',
  inputSchema: z.object({ items: outlineItemsSchema }),
  outputSchema: outlineItemsSchema,
  execute: async ({ context }) => {
    return context.items;
  },
});