import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export function appPresentationRepository() {
  async function find(id: string, userId: string) {
    return prisma.presentation.findUnique({
      where: { id, userId },
    });
  }

  async function create(data: Prisma.PresentationCreateInput) {
    return prisma.presentation.create({
      data,
    });
  }

  async function update(
    id: string,
    userId: string,
    data: Prisma.PresentationUpdateInput
  ) {
    return prisma.presentation.update({
      where: { id, userId },
      data,
    });
  }

  return {
    find,
    create,
    update,
  };
}