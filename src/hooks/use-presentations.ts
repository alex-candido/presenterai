import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { presentationActions } from "@/actions/presentation-actions";
import { API_MESSAGES } from "@/config/messages";

export const PRESENTATION_QUERY_KEYS = {
  all: ["presentations"],
  lists: () => [...PRESENTATION_QUERY_KEYS.all, "list"],
  list: (filters: object) => [...PRESENTATION_QUERY_KEYS.lists(), filters],
  details: () => [...PRESENTATION_QUERY_KEYS.all, "detail"],
  detail: (id: number | string) => [...PRESENTATION_QUERY_KEYS.details(), id],
};

export function usePresentations() {
  const queryClient = useQueryClient();
  const { list, create, get, update, updatePartial, destroy } = presentationActions();

  function listPresentations(params?: PresentationListParams): UseQueryResult<PresentationListResponse, Error> {
    const { ...filters } = params || {};
    const queryKey = PRESENTATION_QUERY_KEYS.list(filters);

    const query = useQuery<PresentationListResponse, Error>({
      queryKey,
      queryFn: () => list(filters),
      staleTime: params?.staleTime ?? 1000 * 60 * 5, // 5 minutes
      onError: (error: Error) => {
        toast.error(error.message || API_MESSAGES.PRESENTATION.FETCH_ERROR);
      },
    } as UseQueryOptions<PresentationListResponse, Error>);
    return query;
  }

  function getPresentation(id: number | string): UseQueryResult<IPresentation, Error> {
    const query = useQuery<IPresentation, Error>({
      queryKey: PRESENTATION_QUERY_KEYS.detail(id),
      queryFn: () => get(id),
      enabled: !!id,
      onError: (error: Error) => {
        toast.error(error.message || API_MESSAGES.PRESENTATION.FETCH_ERROR);
      },
    } as UseQueryOptions<IPresentation, Error>);
    return query;
  }

  function createPresentation() {
    return useMutation<IPresentation, Error, PresentationInput>({
      mutationFn: create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: PRESENTATION_QUERY_KEYS.lists() });
        toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
      },
      onError: (error) => {
        toast.error(error.message || API_MESSAGES.PRESENTATION.CREATE_ERROR);
      },
    });
  }

  function updatePresentation() {
    return useMutation<
      IPresentation,
      Error,
      { id: number; data: PresentationInput },
      { previousPresentation?: IPresentation }
    >({
      mutationFn: ({ id, data }) => update(id, data),
      onMutate: async (variables) => {
        await queryClient.cancelQueries({ queryKey: PRESENTATION_QUERY_KEYS.detail(variables.id) });
        const previousPresentation = queryClient.getQueryData<IPresentation>(PRESENTATION_QUERY_KEYS.detail(variables.id));
        if (previousPresentation) {
          const optimisticPresentation: IPresentation = { ...previousPresentation, ...variables.data };
          queryClient.setQueryData(PRESENTATION_QUERY_KEYS.detail(variables.id), optimisticPresentation);
        }
        return { previousPresentation };
      },
      onError: (err, variables, context) => {
        if (context?.previousPresentation) {
          queryClient.setQueryData(PRESENTATION_QUERY_KEYS.detail(variables.id), context.previousPresentation);
        }
        toast.error(err.message || API_MESSAGES.PRESENTATION.UPDATE_ERROR);
      },
      onSettled: (data) => {
        queryClient.invalidateQueries({ queryKey: PRESENTATION_QUERY_KEYS.lists() });
        if (data) {
          queryClient.invalidateQueries({ queryKey: PRESENTATION_QUERY_KEYS.detail(data.id) });
        }
      },
       onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
      }
    });
  }

  function updatePartialPresentation() {
    return useMutation<
      IPresentation,
      Error,
      { id: number; data: Partial<PresentationInput> },
      { previousPresentation?: IPresentation }
    >({
      mutationFn: ({ id, data }) => updatePartial(id, data),
      onMutate: async (variables) => {
        await queryClient.cancelQueries({ queryKey: PRESENTATION_QUERY_KEYS.detail(variables.id) });
        const previousPresentation = queryClient.getQueryData<IPresentation>(PRESENTATION_QUERY_KEYS.detail(variables.id));
        if (previousPresentation) {
          const optimisticPresentation: IPresentation = { ...previousPresentation, ...variables.data };
          queryClient.setQueryData(PRESENTATION_QUERY_KEYS.detail(variables.id), optimisticPresentation);
        }
        return { previousPresentation };
      },
      onError: (err, variables, context) => {
        if (context?.previousPresentation) {
          queryClient.setQueryData(PRESENTATION_QUERY_KEYS.detail(variables.id), context.previousPresentation);
        }
        toast.error(err.message || API_MESSAGES.PRESENTATION.UPDATE_ERROR);
      },
      onSettled: (data) => {
        queryClient.invalidateQueries({ queryKey: PRESENTATION_QUERY_KEYS.lists() });
        if (data) {
          queryClient.invalidateQueries({ queryKey: PRESENTATION_QUERY_KEYS.detail(data.id) });
        }
      },
      onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
      }
    });
  }

  function destroyPresentation() {
    return useMutation<void, Error, number>({
      mutationFn: destroy,
      onError: (error) => {
        toast.error(error.message || API_MESSAGES.PRESENTATION.DELETE_ERROR);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: PRESENTATION_QUERY_KEYS.lists() });
      },
       onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
      }
    });
  }

  return {
    listPresentations,
    getPresentation,
    createPresentation,
    updatePresentation,
    updatePartialPresentation,
    destroyPresentation,
  };
}
