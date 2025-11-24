import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { generationActions } from "@/actions/generation-actions";
import { API_MESSAGES } from "@/config/messages";

export const GENERATION_QUERY_KEYS = {
  all: ["generations"],
  lists: () => [...GENERATION_QUERY_KEYS.all, "list"],
  list: (filters: object) => [...GENERATION_QUERY_KEYS.lists(), filters],
  details: () => [...GENERATION_QUERY_KEYS.all, "detail"],
  detail: (id: number | string) => [...GENERATION_QUERY_KEYS.details(), id],
};

export function useGenerations() {
  const queryClient = useQueryClient();
  const { list, create, get, update, updatePartial, destroy } = generationActions();

  function listGenerations(params?: GenerationListParams): UseQueryResult<GenerationListResponse, Error> {
    const { ...filters } = params || {};
    const queryKey = GENERATION_QUERY_KEYS.list(filters);

    const query = useQuery<GenerationListResponse, Error>({
      queryKey,
      queryFn: () => list(filters),
      staleTime: params?.staleTime ?? 1000 * 60 * 5, // 5 minutes
      onError: (error: Error) => {
        toast.error(error.message || API_MESSAGES.GENERATION.FETCH_ERROR);
      },
    } as UseQueryOptions<GenerationListResponse, Error>);
    return query;
  }

  function getGeneration(id: number | string): UseQueryResult<IGeneration, Error> {
    const query = useQuery<IGeneration, Error>({
      queryKey: GENERATION_QUERY_KEYS.detail(id),
      queryFn: () => get(id),
      enabled: !!id,
      onError: (error: Error) => {
        toast.error(error.message || API_MESSAGES.GENERATION.FETCH_ERROR);
      },
    } as UseQueryOptions<IGeneration, Error>);
    return query;
  }

  function createGeneration() {
    return useMutation<IGeneration, Error, GenerationInput>({
      mutationFn: create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: GENERATION_QUERY_KEYS.lists() });
        toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
      },
      onError: (error) => {
        toast.error(error.message || API_MESSAGES.GENERATION.CREATE_ERROR);
      },
    });
  }

  function updateGeneration() {
    return useMutation<
      IGeneration,
      Error,
      { id: number; data: GenerationInput },
      { previousGeneration?: IGeneration }
    >({
      mutationFn: ({ id, data }) => update(id, data),
      onMutate: async (variables) => {
        await queryClient.cancelQueries({ queryKey: GENERATION_QUERY_KEYS.detail(variables.id) });
        const previousGeneration = queryClient.getQueryData<IGeneration>(GENERATION_QUERY_KEYS.detail(variables.id));
        if (previousGeneration) {
          const optimisticGeneration: IGeneration = { ...previousGeneration, ...variables.data };
          queryClient.setQueryData(GENERATION_QUERY_KEYS.detail(variables.id), optimisticGeneration);
        }
        return { previousGeneration };
      },
      onError: (err, variables, context) => {
        if (context?.previousGeneration) {
          queryClient.setQueryData(GENERATION_QUERY_KEYS.detail(variables.id), context.previousGeneration);
        }
        toast.error(err.message || API_MESSAGES.GENERATION.UPDATE_ERROR);
      },
      onSettled: (data) => {
        queryClient.invalidateQueries({ queryKey: GENERATION_QUERY_KEYS.lists() });
        if (data) {
          queryClient.invalidateQueries({ queryKey: GENERATION_QUERY_KEYS.detail(data.id) });
        }
      },
       onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
      }
    });
  }

  function updatePartialGeneration() {
    return useMutation<
      IGeneration,
      Error,
      { id: number; data: Partial<GenerationInput> },
      { previousGeneration?: IGeneration }
    >({
      mutationFn: ({ id, data }) => updatePartial(id, data),
      onMutate: async (variables) => {
        await queryClient.cancelQueries({ queryKey: GENERATION_QUERY_KEYS.detail(variables.id) });
        const previousGeneration = queryClient.getQueryData<IGeneration>(GENERATION_QUERY_KEYS.detail(variables.id));
        if (previousGeneration) {
          const optimisticGeneration: IGeneration = { ...previousGeneration, ...variables.data };
          queryClient.setQueryData(GENERATION_QUERY_KEYS.detail(variables.id), optimisticGeneration);
        }
        return { previousGeneration };
      },
      onError: (err, variables, context) => {
        if (context?.previousGeneration) {
          queryClient.setQueryData(GENERATION_QUERY_KEYS.detail(variables.id), context.previousGeneration);
        }
        toast.error(err.message || API_MESSAGES.GENERATION.UPDATE_ERROR);
      },
      onSettled: (data) => {
        queryClient.invalidateQueries({ queryKey: GENERATION_QUERY_KEYS.lists() });
        if (data) {
          queryClient.invalidateQueries({ queryKey: GENERATION_QUERY_KEYS.detail(data.id) });
        }
      },
      onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
      }
    });
  }

  function destroyGeneration() {
    return useMutation<void, Error, number>({
      mutationFn: destroy,
      onError: (error) => {
        toast.error(error.message || API_MESSAGES.GENERATION.DELETE_ERROR);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: GENERATION_QUERY_KEYS.lists() });
      },
       onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
      }
    });
  }

  return {
    listGenerations,
    getGeneration,
    createGeneration,
    updateGeneration,
    updatePartialGeneration,
    destroyGeneration,
  };
}
