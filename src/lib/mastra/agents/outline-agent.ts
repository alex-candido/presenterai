// src/lib/mastra/agents/outline-agent.ts

import { Agent } from "@mastra/core/agent";
import { outlineTool } from "../tools/outline-tool";

export const outlineAgent = new Agent({
  name: "Outline Agent",
  instructions: [
    "You are an expert in Information Architecture and Storytelling for high-impact presentations.",
    "Your primary goal is to transform a user-provided theme into a logically sequenced and well-structured series of CONTENT slides.",
  ],
  model: {
    id: "google/gemini-3.1-flash-lite-preview",
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  },
  tools: { outlineTool },
});
