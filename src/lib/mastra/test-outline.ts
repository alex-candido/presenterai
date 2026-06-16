// src/lib/mastra/test-outline.ts
import { AppCreateGenerationInput } from '@/schemas/app/generation-schema';
import { randomUUID } from 'crypto';
import 'dotenv/config';

import fs from 'fs';
import path from 'path';
import { mastra } from './index';

async function runTest() {
  console.log('Starting outline workflow test...');

  const outlineWorkflow = mastra.getWorkflow('outlineWorkflow');
  if (!outlineWorkflow) {
    console.error('Outline workflow not found!');
    return;
  }

  const testInput: AppCreateGenerationInput = {
    userId: randomUUID(),
    prompt:
      'A presentation about accelerating digital product creation with Micro-SaaS',
    quantity: 2,
    language: 'EN',
    scope: 'MULTI_PAGE',
  };

  let result;
  try {
    console.log(`Executing workflow with prompt: "${testInput.prompt}"`);
    const run = await outlineWorkflow.createRunAsync();
    result = await run.start({ inputData: testInput });

    if (result.status === 'failed') {
      console.error('Workflow execution failed! ❌');
      console.error(result.error);
    } else {
      console.log('Workflow executed successfully! ✅');
      console.log('Generated Outline:');
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('An unexpected error occurred during workflow execution! ❌');
    console.error(error);
  } finally {
    if (result) {
      const resultJson = JSON.stringify(result, null, 2);
      const outputPath = path.join(__dirname, 'outline-test-output.json');
      fs.writeFileSync(outputPath, resultJson);
      console.log(`Full run result saved to ${outputPath}`);
    }
  }
}

runTest();
