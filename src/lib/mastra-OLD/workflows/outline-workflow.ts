// src/lib/mastra/workflows/outline-workflow.ts

import { BRAND_COLORS, CANVAS } from "@/lib/mastra/constants/brand";
import { REPRESENTATION_KEYS, REPRESENTATIONS } from "@/lib/mastra/constants/representations";
import { applySemanticMapping } from "@/lib/mastra/utils/semantic-mapping";
import { aiMetadataSchema } from "@/schemas/app/ai-schema";
import { appCreateGenerationSchema, outlinesSchema } from "@/schemas/app/generation-schema";
import { createStep, createWorkflow } from "@mastra/core/workflows";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const workflowOutputSchema = z.object({
  outlines: outlinesSchema,
  aiMetadata: aiMetadataSchema,
});

// ─── Step 1: Context Retrieval ────────────────────────────────────────────────
// Pure function — no AI call. Builds the WorkflowContext injected into the agent prompt.

function buildWorkflowContext() {
  const colorSummary = Object.values(BRAND_COLORS)
    .map((c) => `${c.purpose}: fill=${c.fill}, stroke=${c.stroke}`)
    .join("\n  ");

  const representationSummary = REPRESENTATION_KEYS.filter((k) => k !== "FREE" && k !== "LIST")
    .map((k) => {
      const t = REPRESENTATIONS[k];
      return `${k} (budget: ${t.elementBudget} elements, layout: ${t.contentLayout.type})`;
    })
    .join("\n  ");

  return {
    canvas: `${CANVAS.width}x${CANVAS.height}px, margin ${CANVAS.margin}px`,
    colorSummary,
    representationSummary,
  };
}

// ─── Step 2: Structuring Agent ────────────────────────────────────────────────

const generateOutlineStep = createStep({
  id: "generate-outline",
  inputSchema: appCreateGenerationSchema,
  outputSchema: workflowOutputSchema,
  execute: async ({ inputData, mastra }) => {
    if (!inputData) throw new Error("Input data not found for generate-outline step");

    const agent = mastra?.getAgent("outlineAgent");
    if (!agent) throw new Error("Outline agent not found in Mastra context");

    const startedAt = Date.now();

    // Step 1: build context
    const ctx = buildWorkflowContext();

    // Step 2: call agent with context injected
    const response = await agent.stream([
      {
        role: "user",
        content: `
WORKFLOW CONTEXT:
- Canvas: ${ctx.canvas}
- Available representation keys: 
  ${ctx.representationSummary}
- Brand color purposes available:
  ${ctx.colorSummary}

INPUT:
- Topic: "${inputData.prompt}"
- Language: ${inputData.language || "EN"}
- Quantity: ${inputData.quantity || 5} slides
- Scope: ${inputData.scope || "MULTI_PAGE"}

Instruction: Generate ONLY 'CONTENT' slides. Respect the language and quantity strictly.
Use only the representation keys listed above. Do NOT invent new keys.
        `.trim(),
      },
    ]);

    const awaitedToolResults = await response.toolResults;
    if (!awaitedToolResults || awaitedToolResults.length === 0) {
      throw new Error("Agent did not call the tool or produce the expected structured output.");
    }

    const resultData = awaitedToolResults[0].payload.result;
    const validation = outlinesSchema.safeParse(resultData);
    if (!validation.success) {
      throw new Error(`Tool output validation failed: ${validation.error.message}`);
    }

    const contentOutlines = validation.data.map((item) => ({
      ...item,
      id: String(item.id || uuidv4()),
    }));

    // Inject structural slides
    const coverOutline = {
      id: uuidv4(),
      order: "0",
      type: "COVER" as const,
      layout:
        "Free canvas. Large centered title in the middle of the slide. Smaller subtitle just below. Large decorative geometric shape in the background (rectangle or ellipse, soft color). No fixed header/footer zones.",
      title: inputData.prompt.substring(0, 80),
      subtitle: `${contentOutlines.length} slides`,
      description: "",
      representation: "",
      concepts: [],
    };

    const summaryOutline = {
      id: uuidv4(),
      order: "0.5",
      type: "SUMMARY" as const,
      layout:
        "Title 'Agenda' at the top left with a decorative line below. Content: vertical list of numbered cards, each card with a highlighted number on the left and slide title on the right. No concepts footer.",
      title: "Agenda",
      subtitle: "",
      description: contentOutlines.map((o) => `${o.order}. ${o.title}`).join("\n"),
      representation: "",
      concepts: [],
    };

    const closingOutline = {
      id: uuidv4(),
      order: String(contentOutlines.length + 1),
      type: "CLOSING" as const,
      layout:
        "Free canvas. Large centered call-to-action or thank-you message. Decorative geometric element as visual accent. Optional: contact/link text below the main message. No concepts footer.",
      title: "Thank You",
      subtitle: "",
      description: "",
      representation: "",
      concepts: [],
    };

    const allOutlines = [coverOutline, summaryOutline, ...contentOutlines, closingOutline];

    // Step 3: Semantic Mapping — inject config into each outline
    const enrichedOutlines = applySemanticMapping(allOutlines);

    const usage = await response.usage;
    const duration = Date.now() - startedAt;

    const aiMetadata: z.infer<typeof aiMetadataSchema> = {
      mastra: {
        agentId: agent.name,
        traceId: uuidv4(),
        version: "1.0.0",
        duration,
        steps: [
          {
            name: "context-retrieval",
            tool: "none",
            status: "success",
            duration: 2,
            usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
          },
          {
            name: "structuring-agent",
            tool: "create_outlines",
            status: "success",
            duration: duration - 10,
            usage: {
              promptTokens: usage.inputTokens ?? 0,
              completionTokens: usage.outputTokens ?? 0,
              totalTokens: usage.totalTokens ?? 0,
            },
          },
          {
            name: "semantic-mapping",
            tool: "none",
            status: "success",
            duration: 8,
            usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
          },
        ],
      },
      usage: {
        promptTokens: usage.inputTokens ?? 0,
        completionTokens: usage.outputTokens ?? 0,
        totalTokens: usage.totalTokens ?? 0,
        cost: 0,
        currency: "USD",
      },
      model: {
        name: "gemini-2.5-flash",
        provider: "google",
      },
      context: {
        outlineSlidesCount: enrichedOutlines.length,
        documentId: inputData.userId,
      },
    };

    return { outlines: enrichedOutlines, aiMetadata };
  },
});

export const outlineWorkflow = createWorkflow({
  id: "outline-workflow",
  inputSchema: appCreateGenerationSchema,
  outputSchema: workflowOutputSchema,
}).then(generateOutlineStep);

outlineWorkflow.commit();
