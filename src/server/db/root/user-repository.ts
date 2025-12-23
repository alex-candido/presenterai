import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export function userRepository() {
  async function listUsers(params?: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    take?: number;
    skip?: number;
    include?: Prisma.UserInclude;
  }) {
    return prisma.user.findMany(params);
  }

  async function createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async function getUser(id: string, params?: { include?: Prisma.UserInclude }) {
    return prisma.user.findUnique({ where: { id }, ...params });
  }

  async function updateUser(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  }

  async function updatePartialUser(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  }

  async function destroyUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }

  return {
    listUsers,
    createUser,
    getUser,
    updateUser,
    updatePartialUser,
    destroyUser,
  };
}
