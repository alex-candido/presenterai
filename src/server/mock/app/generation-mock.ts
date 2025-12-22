import { Outlines } from "@/schemas/app/generation-schema";
import { faker } from "@faker-js/faker";

export function generationMock() {
  function generateOutline(prompt: string): Outlines {
    const slideCount = faker.number.int({ min: 3, max: 6 });

    return Array.from({ length: slideCount }, (_, i) => {
      const order = (i + 1).toString();
      const representation = faker.helpers.arrayElement([
        "TITLE_AND_BODY",
        "COMPARISON",
        "NUMBERED_LIST",
        "PROS_AND_CONS",
        "QUOTE",
      ]);
      return {
        id: faker.string.uuid(),
        order,
        title: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
        subtitle: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        representation,
        concepts: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      };
    });
  }

  return {
    generateOutline,
  };
}
