import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export function generationRepository() {
  async function list(params?: {
    where?: Prisma.GenerationWhereInput;
    orderBy?: Prisma.GenerationOrderByWithRelationInput;
    take?: number;
    skip?: number;
    include?: Prisma.GenerationInclude;
  }) {
    return prisma.generation.findMany(params);
  }

  async function create(data: Prisma.GenerationCreateInput) {
    return prisma.generation.create({ data });
  }

  async function get(id: string, params?: { include?: Prisma.GenerationInclude }) {
    return prisma.generation.findUnique({ where: { id }, ...params });
  }

  async function update(id: string, data: Prisma.GenerationUpdateInput) {
    return prisma.generation.update({ where: { id }, data });
  }

  async function updatePartial(id: string, data: Prisma.GenerationUpdateInput) {
    return prisma.generation.update({ where: { id }, data });
  }

  async function destroy(id: string) {
    return prisma.generation.delete({ where: { id } });
  }

  return {
    list,
    create,
    get,
    update,
    updatePartial,
    destroy,
  };
}