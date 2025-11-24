import { faker } from "@faker-js/faker";
import {
  GenerationScope,
  PresentationStyle,
  Prisma,
  PrismaClient,
  Status,
  UserRole,
  Visibility,
} from "@prisma/client";

const getRandomEnumValue = <T extends Record<string, unknown>>(
  anEnum: T,
): T[keyof T] => {
  const enumValues = Object.values(anEnum) as T[keyof T][];
  return faker.helpers.arrayElement(enumValues);
};

export const userFactory = async (
  prisma: PrismaClient,
  data?: Partial<Prisma.UserCreateInput>,
) => {
  const defaults: Prisma.UserCreateInput = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: getRandomEnumValue(UserRole),
    status: getRandomEnumValue(Status),
  };
  return prisma.user.create({ data: { ...defaults, ...data } });
};

export const documentFactory = async (
  prisma: PrismaClient,
  data: Partial<Prisma.DocumentCreateInput> & {
    user: { connect: { id: string } };
  },
) => {
  const defaults: Omit<Prisma.DocumentCreateInput, "user"> = {
    title: faker.lorem.words({ min: 3, max: 8 }),
    visibility: getRandomEnumValue(Visibility),
    status: getRandomEnumValue(Status),
  };
  return prisma.document.create({ data: { ...defaults, ...data } });
};

export const generationFactory = async (
  prisma: PrismaClient,
  data: Partial<Prisma.GenerationCreateInput> & {
    document: { connect: { id: string } };
    user: { connect: { id: string } };
  },
) => {
  const defaults: Omit<Prisma.GenerationCreateInput, "document" | "user"> = {
    scope: getRandomEnumValue(GenerationScope),
    prompt: faker.lorem.paragraph(),
    outline: { content: faker.lorem.paragraphs(2, "\n\n") },
    aiMetadata: {
      tokens: faker.number.int({ min: 100, max: 1000 }),
      model: "gemini-1.5-pro",
    },
    status: getRandomEnumValue(Status),
  };
  return prisma.generation.create({ data: { ...defaults, ...data } });
};

export const presentationFactory = async (
  prisma: PrismaClient,
  data: Partial<Prisma.PresentationCreateInput> & {
    user: { connect: { id: string } };
    generation: { connect: { id: string } };
  },
) => {
  const defaults: Omit<Prisma.PresentationCreateInput, "user" | "generation"> =
    {
      title: faker.lorem.words({ min: 5, max: 12 }),
      content: { slides: faker.lorem.paragraphs(3, "\n\n") },
      style: getRandomEnumValue(PresentationStyle),
      language: faker.helpers.arrayElement(["en-US", "pt-BR", "es-ES"]),
      status: getRandomEnumValue(Status),
    };
  return prisma.presentation.create({ data: { ...defaults, ...data } });
};