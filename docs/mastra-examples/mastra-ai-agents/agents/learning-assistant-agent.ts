import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { openai } from "@ai-sdk/openai";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";

const learningMemory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../vector.db",
  }),
  embedder: openai.embedding("text-embedding-3-small"),
  options: {
    lastMessages: 20,
    semanticRecall: {
      topK: 3,
      messageRange: { before: 2, after: 1 },
    },
    workingMemory: {
      enabled: true,
      template: `
# Learner Profile

## Personal Info
- Name:
- Learning Style: [Visual, Auditory, Reading/Writing, Kinesthetic]

## Learning Journey
- Current Topics:
  - [Topic 1]:
    - Skill Level: [Beginner, Intermediate, Advanced]
    - Started: [Date]
    - Goals:
    - Resources:
    - Progress Notes:
  - [Topic 2]:
    - Skill Level: [Beginner, Intermediate, Advanced]
    - Started: [Date]
    - Goals:
    - Resources:
    - Progress Notes:

## Session State
- Current Focus:
- Questions to Revisit:
- Recommended Next Steps:
`,
    },
  },
});

export const learningAssistantAgent = new Agent({
  name: "Learning Assistant",
  instructions: `
    You are a personal learning assistant that helps users learn new skills and tracks their progress.
    // ...see above for full instructions...
  `,
  model: openai("gpt-4o"),
  memory: learningMemory,
});
