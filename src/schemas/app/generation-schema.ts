import {
  AmountType,
  AudienceType,
  LanguageType,
  ScenarioType,
  ScopeType,
  ThemeType,
  ToneType,
} from '@prisma/client';
import { z } from 'zod';

export const outlineSchema = z.object({
  id: z.uuid(),
  order: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  representation: z.string(),
  concepts: z.array(z.string()),
});

export const outlinesSchema = z.array(outlineSchema);

export const appCreateGenerationSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
  scope: z.enum(ScopeType).optional(),
  language: z.enum(LanguageType).optional(),
  quantity: z.number().int().positive().optional(),
});

export const appUpdateGenerationSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters').optional(),
  scope: z.enum(ScopeType).optional(),
  tone: z.enum(ToneType).optional(),
  amount: z.enum(AmountType).optional(),
  audience: z.enum(AudienceType).optional(),
  scenario: z.enum(ScenarioType).optional(),
  theme: z.enum(ThemeType).optional(),
  language: z.enum(LanguageType).optional(),
  quantity: z.number().int().positive().optional(),
  aspectRatio: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  outlines: outlinesSchema.optional(),
});

export type Outline = z.infer<typeof outlineSchema>;
export type Outlines = z.infer<typeof outlinesSchema>;
export type AppCreateGenerationInput = z.infer<typeof appCreateGenerationSchema>;
export type AppUpdateGenerationInput = z.infer<typeof appUpdateGenerationSchema>;