import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';

import { orquestadorAgent } from './agents/orchestrator';
import { storage } from './storage/storage';

export const mastra = new Mastra({
	storage,
	agents: {
		orquestadorAgent,
	},
	logger: new PinoLogger({
		name: 'Mastra',
		level: 'info',
	}),
});
