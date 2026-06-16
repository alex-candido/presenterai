import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { appGenerationActions } from "@/actions/app/generation-actions";
import { API_MESSAGES } from "@/config/messages";
import {
  AppCreateGenerationInput,
  AppUpdateGenerationInput,
} from "@/schemas/app/generation-schema";
import { Generation } from "@prisma/client";

export const GENERATION_QUERY_KEYS = {
  all: ["generations"],
  details: () => [...GENERATION_QUERY_KEYS.all, "detail"],
  detail: (id: string) => [...GENERATION_QUERY_KEYS.details(), id],
};

export function useAppGenerations() {
  const queryClient = useQueryClient();
  const { create, get, updatePartial } = appGenerationActions();

  function getGeneration(id: string): UseQueryResult<Generation, Error> {
    const query = useQuery<Generation, Error>({
      queryKey: GENERATION_QUERY_KEYS.detail(id),
      queryFn: () => get(id),
      enabled: !!id,
      onError: (error: Error) => {
        toast.error(error.message || API_MESSAGES.GENERATION.FETCH_ERROR);
      },
    } as UseQueryOptions<Generation, Error>);
    return query;
  }

  function createGeneration() {
    return useMutation<Generation, Error, AppCreateGenerationInput>({
      mutationFn: create,
      onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
      },
      onError: (error) => {
        toast.error(error.message || API_MESSAGES.GENERATION.CREATE_ERROR);
      },
    });
  }

  function updateGeneration() {
    return useMutation<
      Generation,
      Error,
      { id: string; data: AppUpdateGenerationInput },
      { previousGeneration?: Generation }
    >({
      mutationFn: ({ id, data }) => updatePartial(id, data),
      onMutate: async (variables) => {
        await queryClient.cancelQueries({
          queryKey: GENERATION_QUERY_KEYS.detail(variables.id),
        });
        const previousGeneration = queryClient.getQueryData<Generation>(
          GENERATION_QUERY_KEYS.detail(variables.id)
        );
        if (previousGeneration) {
          const optimisticGeneration: Generation = {
            ...previousGeneration,
            ...variables.data,
            outlines: variables.data.outlines ? variables.data.outlines : previousGeneration.outlines,
          };
          queryClient.setQueryData(
            GENERATION_QUERY_KEYS.detail(variables.id),
            optimisticGeneration
          );
        }
        return { previousGeneration };
      },
      onError: (err, variables, context) => {
        if (context?.previousGeneration) {
          queryClient.setQueryData(
            GENERATION_QUERY_KEYS.detail(variables.id),
            context.previousGeneration
          );
        }
        toast.error(err.message || API_MESSAGES.GENERATION.UPDATE_ERROR);
      },
      onSettled: (data) => {
        if (data) {
          queryClient.invalidateQueries({
            queryKey: GENERATION_QUERY_KEYS.detail(data.id),
          });
        }
      },
      onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
      },
    });
  }

  return {
    getGeneration,
    createGeneration,
    updateGeneration,
  };
}
