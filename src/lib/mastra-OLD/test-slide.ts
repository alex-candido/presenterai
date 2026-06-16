// src/lib/mastra/test-slide.ts
import { outlinesSchema } from '@/schemas/app/generation-schema';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { mastra } from './index';

const outlineTestOutput = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'outline-test-output.json'), 'utf-8')
);

const testInput = {
  outlines: outlineTestOutput.result.outlines as z.infer<typeof outlinesSchema>,
  aspectRatio: '16:9',
};


async function runTest() {
  console.log(`Starting slide workflow test for ${testInput.outlines.length} slides...`);

  const slideWorkflow = mastra.getWorkflow('slideWorkflow');
  if (!slideWorkflow) {
    console.error('Slide workflow not found!');
    return;
  }

  let result;
  try {
    console.log(`Executing workflow...`);
    const run = await slideWorkflow.createRunAsync();
    result = await run.start({ inputData: testInput });

    if (result.status === 'failed') {
      console.error('Workflow execution failed! ❌');
      console.error(result.error);
    } else {
      console.log('Workflow executed successfully! ✅');
      console.log('Generated Slides Output:');
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('An unexpected error occurred during workflow execution! ❌');
    console.error(error);
  } finally {
    if (result) {
      const resultJson = JSON.stringify(result, null, 2);
      const outputPath = path.join(__dirname, 'slide-test-output.json');
      fs.writeFileSync(outputPath, resultJson);
      console.log(`Full run result saved to ${outputPath}`);
    }
  }
}

runTest();
