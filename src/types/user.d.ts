type UserInput = {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: Status;
};

type UserListParams = {
  page?: number;
  pageSize?: number;
  customQueryKey?: string[];
  staleTime?: number;
  [key: string]: unknown;
};

type IUser = $Result.DefaultSelection<Prisma.$UserPayload>;

type UserListResponse = {
  total: number;
  count: number;
  next: string | null;
  prev: string | null;
  results: IUser[];
};
