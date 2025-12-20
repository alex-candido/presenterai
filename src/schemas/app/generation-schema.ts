import { z } from 'zod';
import {
  ScopeType,
  ToneType,
  AmountType,
  AudienceType,
  ScenarioType,
  ThemeType,
  LanguageType,
} from '@prisma/client';

export const outlineSchema = z.object({
  id: z.string().uuid(),
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
  scope: z.nativeEnum(ScopeType).optional(),
  language: z.nativeEnum(LanguageType).optional(),
  quantity: z.number().int().positive().optional(),
});

export const appUpdateGenerationSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters').optional(),
  scope: z.nativeEnum(ScopeType).optional(),
  tone: z.nativeEnum(ToneType).optional(),
  amount: z.nativeEnum(AmountType).optional(),
  audience: z.nativeEnum(AudienceType).optional(),
  scenario: z.nativeEnum(ScenarioType).optional(),
  theme: z.nativeEnum(ThemeType).optional(),
  language: z.nativeEnum(LanguageType).optional(),
  quantity: z.number().int().positive().optional(),
  aspectRatio: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  // Note: 'outlines' would likely be updated via a separate process/endpoint
});

// Inferred types
export type Outline = z.infer<typeof outlineSchema>;
export type Outlines = z.infer<typeof outlinesSchema>;
export type AppCreateGenerationInput = z.infer<typeof appCreateGenerationSchema>;
export type AppUpdateGenerationInput = z.infer<typeof appUpdateGenerationSchema>;