import { z } from 'zod';

// Enums and Literal Unions for Excalidraw properties
const FillStyleSchema = z.union([
  z.literal('hachure'),
  z.literal('cross-hatch'),
  z.literal('solid'),
]);

const StrokeStyleSchema = z.union([
  z.literal('solid'),
  z.literal('dashed'),
  z.literal('dotted'),
]);

const RoundnessTypeSchema = z.union([z.literal('round'), z.literal('arc')]);

const TextAlignSchema = z.union([
  z.literal('left'),
  z.literal('center'),
  z.literal('right'),
]);

const VerticalAlignSchema = z.union([
  z.literal('top'),
  z.literal('middle'),
  z.literal('bottom'),
]);

const ArrowheadSchema = z.union([
  z.literal('none'),
  z.literal('arrow'),
  z.literal('dot'),
  z.literal('bar'),
  z.literal('triangle'),
]);

const FontFamilySchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);

const BoundElementSchema = z.object({
  id: z.string(),
  type: z.union([z.literal('arrow'), z.literal('text')]),
});

const ExcalidrawElementBaseSchema = z.object({
  id: z.string(),
  x: z.number(),
  y: z.number(),
  strokeColor: z.string(),
  backgroundColor: z.string(),
  fillStyle: FillStyleSchema,
  strokeWidth: z.number(),
  strokeStyle: StrokeStyleSchema,
  roundness: z
    .union([
      z.null(),
      z.object({
        type: RoundnessTypeSchema,
        value: z.number().optional(),
      }),
    ])
    .optional(),
  roughness: z.number(),
  opacity: z.number(),
  width: z.number(),
  height: z.number(),
  angle: z.number(),
  seed: z.number(),
  version: z.number(),
  versionNonce: z.number(),
  index: z.string().nullable(),
  isDeleted: z.boolean().optional(),
  groupIds: z.array(z.string()).optional(),
  frameId: z.string().nullable().optional(),
  boundElements: z.array(BoundElementSchema).nullable().optional(),
  updated: z.number(),
  link: z.string().nullable().optional(),
  locked: z.boolean().optional(),
  customData: z.record(z.string(), z.any()).optional(),
});

const ExcalidrawRectangleElementSchema = ExcalidrawElementBaseSchema.extend({
  type: z.literal('rectangle'),
});

const ExcalidrawEllipseElementSchema = ExcalidrawElementBaseSchema.extend({
  type: z.literal('ellipse'),
});

const ExcalidrawDiamondElementSchema = ExcalidrawElementBaseSchema.extend({
  type: z.literal('diamond'),
});

const ExcalidrawTextElementSchema = ExcalidrawElementBaseSchema.extend({
  type: z.literal('text'),
  text: z.string(),
  fontSize: z.number(),
  fontFamily: FontFamilySchema,
  textAlign: TextAlignSchema,
  verticalAlign: VerticalAlignSchema,
  containerId: z.string().nullable().optional(),
  originalText: z.string().optional(),
});

const ExcalidrawLinearElementSchema = ExcalidrawElementBaseSchema.extend({
  type: z.union([z.literal('line'), z.literal('arrow')]),
  points: z.array(z.tuple([z.number(), z.number()])),
  lastCommittedPoint: z.tuple([z.number(), z.number()]).nullable().optional(),
  startBinding: z
    .object({
      elementId: z.string(),
      focus: z.number(),
      gap: z.number(),
    })
    .nullable()
    .optional(),
  endBinding: z
    .object({
      elementId: z.string(),
      focus: z.number(),
      gap: z.number(),
    })
    .nullable()
    .optional(),
  startArrowhead: ArrowheadSchema.nullable().optional(),
  endArrowhead: ArrowheadSchema.nullable().optional(),
});

const ExcalidrawImageElementSchema = ExcalidrawElementBaseSchema.extend({
  type: z.literal('image'),
  fileId: z.string().nullable().optional(),
  scale: z.array(z.number()).length(2).optional(),
});

export const excalidrawElementSchema = z.discriminatedUnion('type', [
  ExcalidrawRectangleElementSchema,
  ExcalidrawEllipseElementSchema,
  ExcalidrawDiamondElementSchema,
  ExcalidrawTextElementSchema,
  ExcalidrawLinearElementSchema,
  ExcalidrawImageElementSchema,
]);

const appStateSchema = z
  .object({
    viewBackgroundColor: z.string().optional(),
    gridSize: z.number().nullable().optional(),
  })
  .passthrough();

const filesSchema = z.record(
  z.string(),
  z.object({
    mimeType: z.string(),
    id: z.string(),
    dataURL: z.string(),
    created: z.number(),
    lastRetrieved: z.number().optional(),
  }),
);

export const excalidrawSceneSchema = z.object({
  type: z.literal('excalidraw'),
  version: z.literal(2),
  source: z.string().optional(),
  elements: z.array(excalidrawElementSchema),
  appState: appStateSchema,
  files: filesSchema.optional(),
});

// Inferred types
export type ExcalidrawElement = z.infer<typeof excalidrawElementSchema>;
export type ExcalidrawScene = z.infer<typeof excalidrawSceneSchema>;