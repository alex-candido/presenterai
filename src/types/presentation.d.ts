type PresentationInput = {
  title: string;
  content: JsonValue;
  style: PresentationStyle;
  language: string;
  status: Status;
};

type PresentationListParams = {
  page?: number;
  pageSize?: number;
  customQueryKey?: string[];
  staleTime?: number;
  [key: string]: unknown;
};

type IPresentation = $Result.DefaultSelection<Prisma.$PresentationPayload>;

type PresentationListResponse = {
  total: number;
  count: number;
  next: string | null;
  prev: string | null;
  results: IPresentation[];
};
