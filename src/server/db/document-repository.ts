import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export function documentRepository() {
  async function list(params?: {
    where?: Prisma.DocumentWhereInput;
    orderBy?: Prisma.DocumentOrderByWithRelationInput;
    take?: number;
    skip?: number;
    include?: Prisma.DocumentInclude;
  }) {
    return prisma.document.findMany(params);
  }

  async function create(data: Prisma.DocumentCreateInput) {
    return prisma.document.create({ data });
  }

  async function get(id: string, params?: { include?: Prisma.DocumentInclude }) {
    return prisma.document.findUnique({ where: { id }, ...params });
  }

  async function update(id: string, data: Prisma.DocumentUpdateInput) {
    return prisma.document.update({ where: { id }, data });
  }

  async function updatePartial(id: string, data: Prisma.DocumentUpdateInput) {
    return prisma.document.update({ where: { id }, data });
  }

  async function destroy(id: string) {
    return prisma.document.delete({ where: { id } });
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
