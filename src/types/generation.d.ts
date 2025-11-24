type GenerationInput = {
  scope: GenerationScope;
  prompt: string;
  outline: JsonValue;
  aiMetadata: JsonValue;
  status: Status;
};

type GenerationListParams = {
  page?: number;
  pageSize?: number;
  customQueryKey?: string[];
  staleTime?: number;
  [key: string]: unknown;
};

type IGeneration = $Result.DefaultSelection<Prisma.$GenerationPayload>

type GenerationListResponse = {
  total: number;
  count: number;
  next: string | null;
  prev: string | null;
  results: IGeneration[];
};