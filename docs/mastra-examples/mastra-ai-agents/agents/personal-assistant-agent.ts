import "dotenv/config";
import { Agent } from "@mastra/core/agent";
import { createSmitheryUrl } from "@smithery/sdk";
import { openai } from "@ai-sdk/openai";
import { MCPClient } from "@mastra/mcp";
import { Memory } from "@mastra/memory";

import { LibSQLStore, LibSQLVector } from "@mastra/libsql";

const memory = new Memory({
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  vector: new LibSQLVector({
    connectionUrl: "file:../../memory.db",
  }),
  embedder: openai.embedding("text-embedding-3-small"),
  options: {
    lastMessages: 20,
    semanticRecall: {
      topK: 3,
      messageRange: {
        before: 2,
        after: 1,
      },
    },
    workingMemory: {
      enabled: true,
      template: `
      <user>
         <first_name></first_name>
         <username></username>
         <preferences></preferences>
         <interests></interests>
         <conversation_style></conversation_style>
       </user>`,
    },
  },
});

const smitheryGithubMCPServerUrl = createSmitheryUrl(
  "https://server.smithery.ai/@smithery-ai/github",
  {
    apiKey: process.env.SMITHERY_API_KEY,
    profile: process.env.SMITHERY_PROFILE,
  }
);

const mcp = new MCPClient({
  servers: {
    zapier: {
      url: new URL(process.env.ZAPIER_MCP_URL || ""),
    },
    github: {
      url: smitheryGithubMCPServerUrl,
    },
    hackernews: {
      command: "npx",
      args: ["-y", "@devabdultech/hn-mcp-server"],
    },
  },
});

const mcpTools = await mcp.getTools();

export const personalAssistantAgent = new Agent({
  name: "Personal Assistant",
  instructions: `
    You are a helpful personal assistant that can help with various tasks such as email, 
    monitoring github activity, scheduling social media posts, and providing tech news.
    
    You have access to the following tools:
    
    1. Gmail:
       - Use these tools for reading and categorizing emails from Gmail
       - You can categorize emails by priority, identify action items, and summarize content
       - You can also use this tool to send emails
    
    2. GitHub:
       - Use these tools for monitoring and summarizing GitHub activity
       - You can summarize recent commits, pull requests, issues, and development patterns
    
    3. Hackernews:
       - Use this tool to search for stories on Hackernews
       - You can use it to get the top stories or specific stories
       - You can use it to retrieve comments for stories
    
    Keep your responses concise and friendly.

    You have access to conversation memory and can remember details about users.
    When you learn something about a user, update their working memory using the appropriate tool.
    This includes:
    - Their interests
    - Their preferences
    - Their conversation style (formal, casual, etc.)
    - Any other relevant information that would help personalize the conversation

    Always maintain a helpful and professional tone.
    Use the stored information to provide more personalized responses.
  `,
  model: openai("gpt-4o"),
  tools: { ...mcpTools },
  memory,
});
