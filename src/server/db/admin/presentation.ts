import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';

export function presentationRepository() {
  async function list(params?: {
    where?: Prisma.PresentationWhereInput;
    orderBy?: Prisma.PresentationOrderByWithRelationInput;
    take?: number;
    skip?: number;
    include?: Prisma.PresentationInclude;
  }) {
    return prisma.presentation.findMany(params);
  }

  async function create(data: Prisma.PresentationCreateInput) {
    return prisma.presentation.create({ data });
  }

  async function get(id: string, params?: { include?: Prisma.PresentationInclude }) {
    return prisma.presentation.findUnique({ where: { id }, ...params });
  }

  async function update(id: string, data: Prisma.PresentationUpdateInput) {
    return prisma.presentation.update({ where: { id }, data });
  }

  async function updatePartial(id: string, data: Prisma.PresentationUpdateInput) {
    return prisma.presentation.update({ where: { id }, data });
  }

  async function destroy(id: string) {
    return prisma.presentation.delete({ where: { id } });
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
