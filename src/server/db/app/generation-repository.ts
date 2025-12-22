import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';

export function appGenerationRepository() {
  async function find(id: string, userId: string) {
    return prisma.generation.findUnique({
      where: { id, userId },
    });
  }

  async function createWithDocument(
    userId: string,
    generationData: Omit<Prisma.GenerationCreateInput, 'user' | 'document'>
  ) {
    return prisma.$transaction(async (tx) => {
      // 1. Create the document
      const document = await tx.document.create({
        data: {
          userId,
          // Ensure prompt is a string for the name
          name: String(generationData.prompt).substring(0, 50),
        },
      });

      // 2. Prepare the final generation data, injecting the new documentId into aiMetadata if it exists
      const finalGenerationData: Prisma.GenerationCreateInput = {
        ...generationData,
        user: { connect: { id: userId } },
        document: { connect: { id: document.id } },
      };

      if (
        finalGenerationData.aiMetadata &&
        typeof finalGenerationData.aiMetadata === 'object' &&
        'context' in finalGenerationData.aiMetadata &&
        finalGenerationData.aiMetadata.context &&
        typeof finalGenerationData.aiMetadata.context === 'object'
      ) {
        // Overwrite the temporary documentId with the real one
        (finalGenerationData.aiMetadata.context as { documentId: string }).documentId = document.id;
      }

      // 3. Create the generation
      const generation = await tx.generation.create({
        data: finalGenerationData,
      });

      return generation;
    });
  }

  async function update(
    id: string,
    userId: string,
    data: Prisma.GenerationUpdateInput
  ) {
    return prisma.generation.update({
      where: { id, userId },
      data,
    });
  }

  return {
    find,
    createWithDocument,
    update,
  };
}