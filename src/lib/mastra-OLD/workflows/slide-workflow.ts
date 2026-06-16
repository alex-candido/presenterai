// src/lib/mastra/workflows/slide-workflow.ts

import { aiMetadataSchema } from "@/schemas/app/ai-schema";
import { appUpdateGenerationSchema, outlinesSchema } from "@/schemas/app/generation-schema";
import { spatialPlanSchema } from "@/schemas/app/spatial-schema";
import { slideSchema, slidesSchema } from "@/schemas/app/presentation-schema";
import { BRAND_COLORS } from "@/lib/mastra/constants/brand";
import { validateScene } from "@/lib/mastra/utils/scene-validation";
import { createStep, createWorkflow } from "@mastra/core/workflows";
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const slideWorkflowInputSchema = appUpdateGenerationSchema.extend({
  outlines: outlinesSchema,
});

const slideWorkflowOutputSchema = z.object({
  slides: slidesSchema,
  aiMetadata: aiMetadataSchema,
});

// Serialise brand colors map to a compact string for the agent prompt
function buildBrandColorsContext(): string {
  return Object.entries(BRAND_COLORS)
    .map(([purpose, c]) => `"${purpose}": { fill: "${c.fill}", stroke: "${c.stroke}" }`)
    .join('\n  ');
}

const generateSlidesStep = createStep({
  id: "generate-slides",
  inputSchema: slideWorkflowInputSchema,
  outputSchema: slideWorkflowOutputSchema,
  execute: async ({ inputData, mastra }) => {
    if (!inputData?.outlines) {
      throw new Error("Input data with outlines not found for generate-slides step");
    }

    const spatialAgent = mastra?.getAgent("spatialAgent");
    if (!spatialAgent) throw new Error("Spatial agent not found in Mastra context");

    const slideAgent = mastra?.getAgent("slideAgent");
    if (!slideAgent) throw new Error("Slide agent not found in Mastra context");

    const brandColorsContext = buildBrandColorsContext();
    const startedAt = Date.now();

    const slides: z.infer<typeof slidesSchema> = [];
    let totalPromptTokens = 0;
    let totalCompletionTokens = 0;
    let totalSpatialTokens = 0;
    let totalSynthesisTokens = 0;
    let validationFixTotal = 0;

    // Process each outline individually (sequential to avoid overwhelming the model)
    for (const outline of inputData.outlines) {
      console.log(`[Scene] order=${outline.order} type=${outline.type} key=${outline.config?.representationKey ?? '?'}`);

      // ── Step 1: Spatial Planning ──────────────────────────────────────────
      const step1Start = Date.now();
      const spatialResponse = await spatialAgent.stream([
        {
          role: "user",
          content: `
Generate the spatial plan for this outline.

OUTLINE:
${JSON.stringify(outline, null, 2)}

Call the 'create_spatial_plan' tool with the plan object.
          `.trim(),
        },
      ]);

      const spatialToolResults = await spatialResponse.toolResults;
      if (!spatialToolResults || spatialToolResults.length === 0) {
        console.warn(`[Scene] Spatial plan failed for order=${outline.order}, skipping.`);
        continue;
      }

      const spatialRaw = spatialToolResults[0].payload.result;
      const spatialValidation = spatialPlanSchema.safeParse(spatialRaw);
      if (!spatialValidation.success) {
        console.warn(`[Scene] Spatial plan validation failed for order=${outline.order}: ${spatialValidation.error.message}`);
        continue;
      }

      const spatialPlan = spatialValidation.data;
      const spatialUsage = await spatialResponse.usage;
      totalSpatialTokens += (spatialUsage.totalTokens ?? 0);
      const step1Duration = Date.now() - step1Start;

      // ── Step 2: Element Synthesis ─────────────────────────────────────────
      const step2Start = Date.now();
      const slideResponse = await slideAgent.stream([
        {
          role: "user",
          content: `
Translate this SpatialPlan into Excalidraw JSON elements.

SPATIAL PLAN:
${JSON.stringify(spatialPlan, null, 2)}

BRAND COLORS (colorPurpose → hex):
  ${brandColorsContext}

OUTLINE ORDER: "${outline.order}"

Call the 'create_slides' tool with: [{ order: "${outline.order}", scene: { ... } }]
          `.trim(),
        },
      ]);

      const slideToolResults = await slideResponse.toolResults;
      if (!slideToolResults || slideToolResults.length === 0) {
        console.warn(`[Scene] Slide synthesis failed for order=${outline.order}, skipping.`);
        continue;
      }

      const rawData = slideToolResults[0].payload.result as any;
      const resultArray = Array.isArray(rawData) ? rawData : rawData?.items ?? [];
      const slideValidation = z.array(slideSchema).safeParse(resultArray);

      if (!slideValidation.success || slideValidation.data.length === 0) {
        console.warn(`[Scene] Slide validation failed for order=${outline.order}: ${slideValidation.error?.message}`);
        continue;
      }

      const slideUsage = await slideResponse.usage;
      totalSynthesisTokens += (slideUsage.totalTokens ?? 0);
      const step2Duration = Date.now() - step2Start;

      const rawSlide = slideValidation.data[0];

      // Skip slides where synthesis returned empty elements
      if (!rawSlide.scene?.elements?.length) {
        console.warn(`[Scene] order=${outline.order} — synthesis returned empty elements, skipping.`);
        continue;
      }

      // ── Step 3: Validation & Fix ──────────────────────────────────────────
      const validatedScene = validateScene(rawSlide.scene, String(outline.order));
      validationFixTotal += validatedScene._validation.fixedCount;

      if (validatedScene._validation.fixedCount > 0) {
        console.log(`[Scene] order=${outline.order} — validation fixed ${validatedScene._validation.fixedCount} issue(s)`);
      }

      // Strip _validation before persisting
      const { _validation, ...cleanScene } = validatedScene;

      slides.push({
        ...rawSlide,
        id: uuidv4(),
        scene: cleanScene,
      });

      console.log(`[Scene] order=${outline.order} done — spatial=${step1Duration}ms synthesis=${step2Duration}ms`);

      totalPromptTokens += (spatialUsage.inputTokens ?? 0) + (slideUsage.inputTokens ?? 0);
      totalCompletionTokens += (spatialUsage.outputTokens ?? 0) + (slideUsage.outputTokens ?? 0);
    }

    if (slides.length === 0) {
      throw new Error("No slides were successfully generated.");
    }

    const totalDuration = Date.now() - startedAt;

    const aiMetadata: z.infer<typeof aiMetadataSchema> = {
      mastra: {
        agentId: 'Scene Workflow',
        traceId: uuidv4(),
        version: '2.0.0',
        duration: totalDuration,
        steps: [
          {
            name: 'spatial-planning',
            tool: 'create_spatial_plan',
            status: 'success',
            duration: 0,
            usage: { promptTokens: 0, completionTokens: 0, totalTokens: totalSpatialTokens },
          },
          {
            name: 'element-synthesis',
            tool: 'create_slides',
            status: 'success',
            duration: 0,
            usage: { promptTokens: 0, completionTokens: 0, totalTokens: totalSynthesisTokens },
          },
          {
            name: 'validation-fix',
            tool: 'none',
            status: 'success',
            duration: 0,
            usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
            result: { issuesFixed: validationFixTotal },
          },
        ],
      },
      usage: {
        promptTokens: totalPromptTokens,
        completionTokens: totalCompletionTokens,
        totalTokens: totalPromptTokens + totalCompletionTokens,
        cost: 0,
        currency: 'USD',
      },
      model: {
        name: 'gemini-3.1-flash-lite-preview',
        provider: 'google',
      },
      context: {
        outlineSlidesCount: slides.length,
        documentId: 'unknown',
      },
    };

    return { slides, aiMetadata };
  },
});

export const slideWorkflow = createWorkflow({
  id: "slide-workflow",
  inputSchema: slideWorkflowInputSchema,
  outputSchema: slideWorkflowOutputSchema,
}).then(generateSlidesStep);

slideWorkflow.commit();
