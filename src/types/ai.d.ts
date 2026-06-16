type MastraStep = {
  name: string;   
  tool: string;          
  duration: number;     
  status: 'success' | 'failed';
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  result?: any; 
};

type AiMetadata = {
  mastra: {
    agentId: string;
    traceId: string; 
    version: string;
    duration: number;
    steps: MastraStep[];
  };
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost: number; 
    currency: 'USD' | 'BRL';
  }
  model: {
    name: string;
    provider: 'google' | 'openai' | 'anthropic' | 'custom';
    version?: string;
  };
  context: {
    outlineSlidesCount: number;
    documentId: string;
  }
};