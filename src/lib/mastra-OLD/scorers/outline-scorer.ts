// src/lib/mastra/scorers/outline-scorer.ts

import { createScorer } from '@mastra/core/scores';

export const outlineQualityScorer = createScorer({
  name: 'Outline Quality',
  description: 'Evaluates if the outline has a logical sequence and dense technical concepts.',
  type: 'agent',
  judge: {
  model: {
    id: 'google/gemini-2.5-flash',
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  },
    instructions: `
      You are a Data Structure and Storytelling Critic.
      Your task is to provide a score from 1 to 10 on the quality of a presentation outline.
      
      ### Evaluation Criteria:
      1.  **Narrative Progression (1-4 pts)**: Do the slides follow a logical order (Introduction, Development, Conclusion)? Is there a clear story being told?
      2.  **Concept Density (1-3 pts)**: Does the 'concepts' field contain relevant, specific technical terms, or is it filled with generic placeholders?
      3.  **Semantic Design (1-3 pts)**: Does the 'representation' field provide a clear, meaningful visual instruction (e.g., Matrix, Flowchart) or is it vague?

      ### Output Format:
      You MUST return a single JSON object with two keys: "score" (a number from 1 to 10) and "justification" (a brief explanation for your score).
      
      Example: {"score": 8, "justification": "Strong narrative flow and dense concepts, but the representation for slide 3 was a bit generic."}
    `,
  },
});

export const outlineScorers = {
  outlineQualityScorer,
};