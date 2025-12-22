import { ExcalidrawElement } from '@/schemas/app/excalidraw-schema';
import { Outlines } from '@/schemas/app/generation-schema';
import { Slides } from '@/schemas/app/presentation-schema';
import { faker } from '@faker-js/faker';

export function generateMockedAiMetadata() {`
  `}

export function generateMockedSlidesFromOutlines(outlines: Outlines): Slides {
  console.log('AI MOCK: Generating slides from outlines...');

  const slides: Slides = outlines.map((outline) => {
    // Create a few mock elements for each slide
    const elements: ExcalidrawElement[] = [
      // Title element
      {
        id: `element-title-${outline.id}`,
        type: 'text',
        x: 100,
        y: 100,
        width: 800,
        height: 50,
        angle: 0,
        strokeColor: '#000000',
        backgroundColor: 'transparent',
        fillStyle: 'hachure',
        strokeWidth: 1,
        strokeStyle: 'solid',
        roughness: 1,
        opacity: 100,
        seed: faker.number.int(),
        version: 2,
        versionNonce: faker.number.int(),
        isDeleted: false,
        updated: Date.now(),
        text: outline.title,
        fontSize: 36,
        fontFamily: 2,
        textAlign: 'center',
        verticalAlign: 'middle',
        index: 'a1',
        customData: {}
      },
      // Description element
      {
        id: `element-desc-${outline.id}`,
        type: 'text',
        x: 100,
        y: 200,
        width: 800,
        height: 150,
        angle: 0,
        strokeColor: '#000000',
        backgroundColor: 'transparent',
        fillStyle: 'hachure',
        strokeWidth: 1,
        strokeStyle: 'solid',
        roughness: 1,
        opacity: 100,
        seed: faker.number.int(),
        version: 2,
        versionNonce: faker.number.int(),
        isDeleted: false,
        updated: Date.now(),
        text: outline.description,
        fontSize: 20,
        fontFamily: 1,
        textAlign: 'left',
        verticalAlign: 'top',
        index: 'a2',
        customData: {}
      },
    ];

    return {
      id: `slide-${outline.id}`,
      order: outline.order,
      outline: outline,
      scene: {
        type: 'excalidraw',
        version: 2,
        source: 'presenterai-mock',
        elements: elements,
        appState: {
          viewBackgroundColor: '#FFFFFF',
          gridSize: null,
        },
      },
    };
  });

  return slides;
}
