import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { userActions } from "@/actions/user-actions";
import { API_MESSAGES } from "@/config/messages";

export const USER_QUERY_KEYS = {
  all: ["users"],
  lists: () => [...USER_QUERY_KEYS.all, "list"],
  list: (filters: object) => [...USER_QUERY_KEYS.lists(), filters],
  details: () => [...USER_QUERY_KEYS.all, "detail"],
  detail: (id: number | string) => [...USER_QUERY_KEYS.details(), id],
};

export function useAdminUsers() {
  const queryClient = useQueryClient();
  const { list, create, get, update, updatePartial, destroy } = userActions();

  function listUsers(params?: UserListParams): UseQueryResult<UserListResponse, Error> {
    const { ...filters } = params || {};
    const queryKey = USER_QUERY_KEYS.list(filters);

    const query = useQuery<UserListResponse, Error>({
      queryKey,
      queryFn: () => list(filters),
      staleTime: params?.staleTime ?? 1000 * 60 * 5,
      onError: (error: Error) => {
        toast.error(error.message || API_MESSAGES.USER.FETCH_ERROR);
      },
    } as UseQueryOptions<UserListResponse, Error>);
    return query;
  }

  function getUser(id: number | string): UseQueryResult<IUser, Error> {
    const query = useQuery<IUser, Error>({
      queryKey: USER_QUERY_KEYS.detail(id),
      queryFn: () => get(id),
      enabled: !!id,
      onError: (error: Error) => {
        toast.error(error.message || API_MESSAGES.USER.FETCH_ERROR);
      },
    } as UseQueryOptions<IUser, Error>);
    return query;
  }

  function createUser() {
    return useMutation<IUser, Error, UserInput>({
      mutationFn: create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
        toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
      },
      onError: (error) => {
        toast.error(error.message || API_MESSAGES.USER.CREATE_ERROR);
      },
    });
  }

  function updateUser() {
    return useMutation<
      IUser,
      Error,
      { id: number; data: UserInput },
      { previousUser?: IUser }
    >({
      mutationFn: ({ id, data }) => update(id, data),
      onMutate: async (variables) => {
        await queryClient.cancelQueries({ queryKey: USER_QUERY_KEYS.detail(variables.id) });
        const previousUser = queryClient.getQueryData<IUser>(USER_QUERY_KEYS.detail(variables.id));
        if (previousUser) {
          const optimisticUser: IUser = { ...previousUser, ...variables.data };
          queryClient.setQueryData(USER_QUERY_KEYS.detail(variables.id), optimisticUser);
        }
        return { previousUser };
      },
      onError: (err, variables, context) => {
        if (context?.previousUser) {
          queryClient.setQueryData(USER_QUERY_KEYS.detail(variables.id), context.previousUser);
        }
        toast.error(err.message || API_MESSAGES.USER.UPDATE_ERROR);
      },
      onSettled: (data) => {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
        if (data) {
          queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.detail(data.id) });
        }
      },
       onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
      }
    });
  }

  function updatePartialUser() {
    return useMutation<
      IUser,
      Error,
      { id: number; data: Partial<UserInput> },
      { previousUser?: IUser }
    >({
      mutationFn: ({ id, data }) => updatePartial(id, data),
      onMutate: async (variables) => {
        await queryClient.cancelQueries({ queryKey: USER_QUERY_KEYS.detail(variables.id) });
        const previousUser = queryClient.getQueryData<IUser>(USER_QUERY_KEYS.detail(variables.id));
        if (previousUser) {
          const optimisticUser: IUser = { ...previousUser, ...variables.data };
          queryClient.setQueryData(USER_QUERY_KEYS.detail(variables.id), optimisticUser);
        }
        return { previousUser };
      },
      onError: (err, variables, context) => {
        if (context?.previousUser) {
          queryClient.setQueryData(USER_QUERY_KEYS.detail(variables.id), context.previousUser);
        }
        toast.error(err.message || API_MESSAGES.USER.UPDATE_ERROR);
      },
      onSettled: (data) => {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
        if (data) {
          queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.detail(data.id) });
        }
      },
      onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
      }
    });
  }

  function destroyUser() {
    return useMutation<void, Error, number>({
      mutationFn: destroy,
      onError: (error) => {
        toast.error(error.message || API_MESSAGES.USER.DELETE_ERROR);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
      },
       onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
      }
    });
  }

  return {
    listUsers,
    getUser,
    createUser,
    updateUser,
    updatePartialUser,
    destroyUser,
  };
}