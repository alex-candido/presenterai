type DocumentInput = {
  title: string;
  visibility: Visibility;
  status: Status;
};

type DocumentListParams = {
  page?: number;
  pageSize?: number;
  customQueryKey?: string[];
  staleTime?: number;
  [key: string]: unknown;
};

type IDocument = $Result.DefaultSelection<Prisma.$DocumentPayload>;

type DocumentListResponse = {
  total: number;
  count: number;
  next: string | null;
  prev: string | null;
  results: IDocument[];
};