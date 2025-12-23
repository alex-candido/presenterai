import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const getCurrentTimeTool = createTool({
	id: 'get-current-time',
	description: 'Get the current date and time',
	inputSchema: z.object({}),
	outputSchema: z.object({
		datetime: z.string().describe('Current date and time in ISO format'),
		timezone: z.string().describe('Timezone of the server'),
		formatted: z.string().describe('Human-readable formatted date and time'),
	}),
	execute: async () => {
		const now = new Date();
		return {
			datetime: now.toISOString(),
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			formatted: now.toLocaleString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				timeZoneName: 'short',
			}),
		};
	},
});
