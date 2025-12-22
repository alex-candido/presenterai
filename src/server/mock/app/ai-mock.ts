import { AiMetadata } from "@/schemas/app/ai-schema";
import { faker } from "@faker-js/faker";

export function aiMock() {
  function generateAiMetadata(context: { documentId: string; outlineSlidesCount: number }): AiMetadata {
    const promptTokens = faker.number.int({ min: 100, max: 500 });
    const completionTokens = faker.number.int({ min: 200, max: 1000 });
    const totalTokens = promptTokens + completionTokens;

    return {
      mastra: {
        agentId: faker.string.uuid(),
        traceId: faker.string.uuid(),
        version: "1.0.0-mock",
        duration: faker.number.int({ min: 1000, max: 5000 }),
        steps: [], // Can be populated if needed
      },
      usage: {
        promptTokens,
        completionTokens,
        totalTokens,
        cost: faker.number.float({ min: 0.01, max: 0.1 }),
        currency: "USD",
      },
      model: {
        name: "gemini-1.5-pro-mock",
        provider: "google",
      },
      context: {
        outlineSlidesCount: context.outlineSlidesCount,
        documentId: context.documentId,
      },
    };
  }

  return {
    generateAiMetadata,
  };
}
