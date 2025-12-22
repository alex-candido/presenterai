import { z } from 'zod';
import { excalidrawSceneSchema } from './excalidraw-schema';
import { outlineSchema } from './generation-schema';

export const slideSchema = z.object({
  id: z.uuid(),
  order: z.string(),
  outline: outlineSchema,
  scene: excalidrawSceneSchema,
});

export const slidesSchema = z.array(slideSchema);

export const appCreatePresentationSchema = z.object({
  generationId: z.string().uuid(),
});

export const appUpdatePresentationSchema = z.object({
  slides: slidesSchema.optional(),
});

export type Slide = z.infer<typeof slideSchema>;
export type Slides = z.infer<typeof slidesSchema>;
export type AppCreatePresentationInput = z.infer<typeof appCreatePresentationSchema>;
export type AppUpdatePresentationInput = z.infer<typeof appUpdatePresentationSchema>;