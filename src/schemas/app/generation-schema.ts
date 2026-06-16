import { LanguageType, ScopeType } from '@prisma/client';
import { z } from 'zod';

export const outlineTypeSchema = z.enum([
  'COVER',    // Capa da apresentação — sem zonas fixas, visual livre
  'SUMMARY',  // Sumário/Agenda — lista dos títulos dos slides
  'CONTENT',  // Slide de conteúdo padrão
  'SECTION',  // Separador de seção
  'CLOSING',  // Slide final — call-to-action, contato
]);

// ─── OutlineConfig — injetado pelo Semantic Mapping (Step 3) ─────────────────

export const zoneSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

export const brandColorSchema = z.object({
  purpose: z.string(),
  fill: z.string(),
  stroke: z.string(),
});

export const contentLayoutSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('free'),
  }),
  z.object({
    type: z.literal('list'),
  }),
  z.object({
    type: z.literal('full'),
    sequence: z.array(z.object({
      label: z.string(),
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
    })).optional(),
  }),
  z.object({
    type: z.literal('split'),
    columns: z.array(z.object({ x: z.number(), width: z.number() })),
    divider: z.object({ x: z.number(), y: z.number(), height: z.number() }).optional(),
  }),
  z.object({
    type: z.literal('grid'),
    columns: z.array(z.object({ x: z.number(), width: z.number() })),
    rows: z.array(z.object({ y: z.number(), height: z.number() })),
  }),
]);

export const outlineConfigSchema = z.object({
  representationKey: z.string(),
  zones: z.object({
    header:  zoneSchema.optional(),
    content: zoneSchema.optional(),
    footer:  zoneSchema.optional(),
    full:    zoneSchema.optional(),
  }),
  contentLayout: contentLayoutSchema,
  suggestedColors: z.object({
    primary:   brandColorSchema,
    secondary: brandColorSchema.optional(),
  }),
  elementBudget: z.number().int().positive(),
});

// ─── Outline ─────────────────────────────────────────────────────────────────

export const outlineSchema = z.object({
  id: z.string().uuid().optional(),
  order: z.string(),
  type: outlineTypeSchema,
  layout: z.string(), // instrução descritiva livre de composição visual por zona
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  representation: z.string(), // modelo semântico: "FLOW (A → B → C)"
  concepts: z.array(z.string()),
  config: outlineConfigSchema.optional(), // injetado após Semantic Mapping
});

export const outlinesSchema = z.array(outlineSchema);

export const appCreateGenerationSchema = z.object({
  userId: z.string().uuid(),
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
  scope: z.nativeEnum(ScopeType).optional(),
  language: z.nativeEnum(LanguageType).optional(),
  quantity: z.number().int().positive().optional(),
});

export const appUpdateGenerationSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters').optional(),
  scope: z.nativeEnum(ScopeType).optional(),
  language: z.nativeEnum(LanguageType).optional(),
  quantity: z.number().int().positive().optional(),
  aspectRatio: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  outlines: outlinesSchema.optional(),
});

export type OutlineType = z.infer<typeof outlineTypeSchema>;
export type Zone = z.infer<typeof zoneSchema>;
export type BrandColor = z.infer<typeof brandColorSchema>;
export type ContentLayout = z.infer<typeof contentLayoutSchema>;
export type OutlineConfig = z.infer<typeof outlineConfigSchema>;
export type Outline = z.infer<typeof outlineSchema>;
export type Outlines = z.infer<typeof outlinesSchema>;
export type AppCreateGenerationInput = z.infer<typeof appCreateGenerationSchema>;
export type AppUpdateGenerationInput = z.infer<typeof appUpdateGenerationSchema>;