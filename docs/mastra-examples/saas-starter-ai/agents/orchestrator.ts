import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';

import { getCurrentTimeTool } from '../tools/get-current-time';

export const orquestadorAgent = new Agent({
	name: 'AI Assistant',
	description: 'A helpful AI assistant for your SaaS application',
	instructions: `You are a helpful AI assistant. You can assist users with various tasks, answer questions, and provide information.

When users ask for the current time, use the getCurrentTime tool to provide accurate information.

Be concise, helpful, and friendly in your responses.`,
	model: openai('gpt-4o-mini'),
	tools: {
		getCurrentTime: getCurrentTimeTool,
	},
	defaultStreamOptions: {
		temperature: 0.7,
		maxSteps: 10,
	},
});
