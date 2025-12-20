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
  scope: z.nativeEnum(ScopeType),
  tone: z.nativeEnum(ToneType),
  amount: z.nativeEnum(AmountType),
  audience: z.nativeEnum(AudienceType),
  scenario: z.nativeEnum(ScenarioType),
  theme: z.nativeEnum(ThemeType),
  language: z.nativeEnum(LanguageType),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  aspectRatio: z.string().min(1, 'Aspect ratio is required'),
  keywords: z.array(z.string()).optional(),
  prompt: z.string().min(1, 'Prompt is required'),
  status: z.nativeEnum(StatusType),
});

export type AdminGenerationInput = z.infer<typeof adminGenerationInputSchema>;
