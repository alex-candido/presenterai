import { Generation, GenerationScope, Status } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

type MockGenerationParams = {
  userId: string;
  prompt: string;
  scope: GenerationScope;
};

export function generationMock() {
  function create({ userId, prompt, scope }: MockGenerationParams): Generation {
    const generationId = uuidv4();
    const documentId = uuidv4();
    const now = new Date();

    return {
      id: generationId,
      order: 1,
      documentId: documentId,
      userId: userId,
      scope: scope,
      prompt: prompt,
      outline: scope === GenerationScope.MULTI_PAGE ? { slides: [{ title: 'Initial Mock Slide' }] } : { elements: [] },
      aiMetadata: { tokens: 123, model: 'mock-model-v1' },
      status: Status.ACTIVE,
      createdAt: now,
      updatedAt: now,
    };
  }

  return {
    create,
  };
}
