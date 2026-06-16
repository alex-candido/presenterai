import { PrismaPg } from "@prisma/adapter-pg";
import { Document, Generation, PrismaClient, User } from "@prisma/client";
import chalk from "chalk";

import { accountFactory, documentFactory, generationFactory, presentationFactory, userFactory } from "./factories";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
});

async function main(quantity: number = 10) {
  console.log(chalk.bold.yellow("🚀 Starting database seeding..."));

  console.log(chalk.magenta("🧹 Cleaning up existing data..."));

  await prisma.presentation.deleteMany();
  await prisma.generation.deleteMany();
  await prisma.document.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log(chalk.magenta("✨ Database cleaned."));

  async function seedUsers(quantity: number): Promise<User[]> {
    console.log(chalk.cyan(`🌱 Seeding ${quantity} users...`));
    const users: User[] = [];
    for (let i = 0; i < quantity; i++) {
      const user = await userFactory(prisma);
      await accountFactory(prisma, {
        user: { connect: { id: user.id } },
      });
      users.push(user);
    }
    console.log(chalk.green("🌱 Users seeded successfully!"));
    return users;
  }

  const users = await seedUsers(quantity);

  async function seedDocuments(users: User[]): Promise<Document[]> {
    console.log(chalk.cyan(`🌱 Seeding documents for ${users.length} users...`));
    const documents: Document[] = [];
    for (const user of users) {
      const document = await documentFactory(prisma, {
        user: { connect: { id: user.id } },
      });
      documents.push(document);
    }
    console.log(chalk.green("🌱 Documents seeded successfully!"));
    return documents;
  }

  const documents = await seedDocuments(users);

  async function seedGenerations(documents: Document[]): Promise<Generation[]> {
    console.log(chalk.cyan(`🌱 Seeding generations for ${documents.length} documents...`));
    const generations: Generation[] = [];
    for (const document of documents) {
      const generation = await generationFactory(prisma, {
        document: { connect: { id: document.id } },
        user: { connect: { id: document.userId } },
      });

      generations.push(generation);
    }
    console.log(chalk.green("🌱 Generations seeded successfully!"));
    return generations;
  }

  const generations = await seedGenerations(documents);

  async function seedPresentations(generations: Generation[]) {
    console.log(chalk.cyan(`🌱 Seeding presentations for ${generations.length} generations...`));
    for (const generation of generations) {
      const presentation = await presentationFactory(prisma, {
        generation: { connect: { id: generation.id } },
        user: { connect: { id: generation.userId } },
      });
    }
    console.log(chalk.green("🌱 Presentations seeded successfully!"));
  }

  await seedPresentations(generations);

  console.log(chalk.bold.yellow("🎉 Seeding finished."));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
