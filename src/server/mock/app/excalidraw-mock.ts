import { faker } from '@faker-js/faker';
import { ExcalidrawScene } from '@/schemas/app/excalidraw-schema';

export function generateMockedExcalidrawScene(): ExcalidrawScene {
  return {
    type: 'excalidraw',
    version: 2,
    source: 'presenterai-mock',
    elements: [
      {
        id: faker.string.uuid(),
        type: 'rectangle',
        x: 100,
        y: 100,
        width: 300,
        height: 150,
        angle: 0,
        strokeColor: '#000000',
        backgroundColor: '#eab308', // yellow-500
        fillStyle: 'solid',
        strokeWidth: 2,
        strokeStyle: 'solid',
        roughness: 1,
        opacity: 100,
        seed: faker.number.int(),
        version: 3,
        versionNonce: faker.number.int(),
        isDeleted: false,
        updated: Date.now(),
        index: 'a1',
        customData: {}
      },
    ],
    appState: {
      viewBackgroundColor: '#FFFFFF',
      gridSize: 20,
    },
    files: {},
  };
}
