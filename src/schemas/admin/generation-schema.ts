import {
  AmountType,
  AudienceType,
  LanguageType,
  ScenarioType,
  ScopeType,
  StatusType,
  ThemeType,
  ToneType
} from '@prisma/client';
import { z } from 'zod';

export const adminGenerationInputSchema = z.object({
  scope: z.enum(ScopeType),
  tone: z.enum(ToneType),
  amount: z.enum(AmountType),
  audience: z.enum(AudienceType),
  scenario: z.enum(ScenarioType),
  theme: z.enum(ThemeType),
  language: z.enum(LanguageType),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  aspectRatio: z.string().min(1, 'Aspect ratio is required'),
  keywords: z.array(z.string()).optional(),
  prompt: z.string().min(1, 'Prompt is required'),
  status: z.enum(StatusType),
});

export type AdminGenerationInput = z.infer<typeof adminGenerationInputSchema>;
