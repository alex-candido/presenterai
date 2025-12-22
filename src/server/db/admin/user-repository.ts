import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';

export function AdminUserRepository() {
  async function list(params?: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    take?: number;
    skip?: number;
    include?: Prisma.UserInclude;
  }) {
    return prisma.user.findMany(params);
  }

  async function create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async function get(id: string, params?: { include?: Prisma.UserInclude }) {
    return prisma.user.findUnique({ where: { id }, ...params });
  }

  async function update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  }

  async function updatePartial(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  }

  async function destroy(id: string) {
    return prisma.user.delete({ where: { id } });
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
