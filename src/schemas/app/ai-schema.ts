import { z } from 'zod';

export const mastraStepSchema = z.object({
  name: z.string(),
  tool: z.string(),
  duration: z.number(),
  status: z.enum(['success', 'failed']),
  usage: z.object({
    promptTokens: z.number(),
    completionTokens: z.number(),
    totalTokens: z.number(),
  }),
  result: z.any().optional(),
});

export const aiMetadataSchema = z.object({
  mastra: z.object({
    agentId: z.string(),
    traceId: z.string(),
    version: z.string(),
    duration: z.number(),
    steps: z.array(mastraStepSchema),
  }),
  usage: z.object({
    promptTokens: z.number(),
    completionTokens: z.number(),
    totalTokens: z.number(),
    cost: z.number(),
    currency: z.enum(['USD', 'BRL']),
  }),
  model: z.object({
    name: z.string(),
    provider: z.enum(['google', 'openai', 'anthropic', 'custom']),
    version: z.string().optional(),
  }),
  context: z.object({
    outlineSlidesCount: z.number(),
    documentId: z.string(),
  }),
});

// Inferred types
export type MastraStep = z.infer<typeof mastraStepSchema>;
export type AiMetadata = z.infer<typeof aiMetadataSchema>;