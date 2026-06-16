import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { openai } from "@ai-sdk/openai";

const memory = new Memory({
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
# User Profile

## Personal Info
- Name:
- Location:
- Timezone:
- Occupation:

## Preferences
- Communication Style:
- Topics of Interest:
- Learning Goals:

## Project Information
- Current Projects:
  - [Project 1]:
    - Deadline:
    - Status:
  - [Project 2]:
    - Deadline:
    - Status:

## Session State
- Current Topic:
- Open Questions:
- Action Items:
`,
    },
  },
});

// Create an agent with memory
export const memoryAgent = new Agent({
  name: "MemoryAgent",
  instructions: `
    You are a helpful assistant with advanced memory capabilities.
    You can remember previous conversations and user preferences.
    
    IMPORTANT: You have access to working memory to store persistent information about the user.
    When you learn something important about the user, update your working memory.
    This includes:
    - Their name
    - Their location
    - Their preferences
    - Their interests
    - Any other relevant information that would help personalize the conversation
    
    Always refer to your working memory before asking for information the user has already provided.
    Use the information in your working memory to provide personalized responses.
  `,
  model: openai("gpt-4o"),
  memory: memory,
});
