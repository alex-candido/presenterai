// src/lib/mastra/agents/slide-agent.ts
// Step 2 of the Scene Workflow — Excalidraw element synthesis.
// Receives a SpatialPlan (roles + coordinates + color purposes)
// and translates each planned element into valid Excalidraw JSON.

import { slideTool } from "@/lib/mastra/tools/slide-tool";
import { Agent } from "@mastra/core/agent";

export const slideAgent = new Agent({
  name: "Slide Agent",
  instructions: [
    "You are an Excalidraw JSON specialist. You receive a SpatialPlan and translate each planned element into a valid Excalidraw element object.",
    "You do NOT decide layout or positions — those are already given in the SpatialPlan. Your job is pure JSON synthesis.",
  ],
  model: {
    id: "google/gemini-3.1-flash-lite-preview",
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  },
  tools: { slideTool },
});
