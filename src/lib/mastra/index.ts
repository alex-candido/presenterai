// src/lib/mastra/index.ts

import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import { PinoLogger } from '@mastra/loggers';

import { outlineAgent } from './agents/outline-agent';
import { slideAgent } from './agents/slide-agent';

import { outlineWorkflow } from './workflows/outline-workflow';
import { slideWorkflow } from './workflows/slide-workflow';

// import { outlineScorers } from './scorers/outline-scorer';
// import { slideScorers } from './scorers/slide-scorer';


export const mastra = new Mastra({
  agents: {
    outlineAgent,
    slideAgent,
  },
  workflows: {
    outlineWorkflow,
    slideWorkflow,
  },
  // scorers: {
  //   ...outlineScorers,
  //   ...slideScorers,
  // },
  storage: new LibSQLStore({
    url: process.env.NODE_ENV === 'production' ? 'file:mastra.db' : ':memory:',
  }),
  logger: new PinoLogger({
    name: 'presenterai-ai-engine',
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  }),
});