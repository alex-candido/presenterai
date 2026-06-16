// src/schemas/app/spatial-schema.ts
// Data contracts for the Scene Workflow Step 1 (Spatial Planning).

import { z } from 'zod';

export const plannedElementSchema = z.object({
  role: z.string(),           // semantic role: "header-title" | "node-1" | "arrow-1-2" | "footer-bar"
  type: z.enum(['rectangle', 'ellipse', 'diamond', 'line', 'arrow', 'text']),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  colorPurpose: z.string(),   // maps to BRAND_COLORS key: "Primary/Neutral" | "Start/Trigger" | "transparent"
  text: z.string().nullable().optional(),
  connectsFrom: z.string().nullable().optional(), // role of source element (arrows only)
  connectsTo: z.string().nullable().optional(),   // role of target element (arrows only)
});

export const spatialPlanSchema = z.object({
  outlineId: z.string(),
  outlineOrder: z.string(),
  canvasSize: z.object({ width: z.number(), height: z.number() }),
  elements: z.array(plannedElementSchema),
});

export const validationIssueSchema = z.object({
  elementId: z.string(),
  issue: z.enum(['text-overflow', 'z-index', 'out-of-bounds', 'missing-container-binding', 'missing-frame']),
  detail: z.string().optional(),
  fixed: z.boolean(),
});

export const validationResultSchema = z.object({
  issues: z.array(validationIssueSchema),
  fixedCount: z.number(),
});

export type PlannedElement = z.infer<typeof plannedElementSchema>;
export type SpatialPlan = z.infer<typeof spatialPlanSchema>;
export type ValidationIssue = z.infer<typeof validationIssueSchema>;
export type ValidationResult = z.infer<typeof validationResultSchema>;
