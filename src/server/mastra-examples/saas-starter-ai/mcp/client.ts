import { MCPClient } from '@mastra/mcp';

export const mcp = new MCPClient({
	id: 'test',
	servers: {
		// Stdio example
		sequential: {
			command: 'npx',
			args: ['-y', '@modelcontextprotocol/server-sequential-thinking'],
		},
	},
});
