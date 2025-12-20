import { z } from 'zod';
import { excalidrawSceneSchema } from './excalidraw-schema';
import { outlineSchema } from './generation-schema';

export const slideSchema = z.object({
  id: z.string().uuid(),
  order: z.string(),
  outline: outlineSchema,
  scene: excalidrawSceneSchema,
});

export const slidesSchema = z.array(slideSchema);

// Inferred types
export type Slide = z.infer<typeof slideSchema>;
export type Slides = z.infer<typeof slidesSchema>;