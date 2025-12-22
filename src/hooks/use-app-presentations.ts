import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { appPresentationActions } from "@/actions/app/presentation-actions";
import { API_MESSAGES } from "@/config/messages";
import {
  AppCreatePresentationInput,
  AppUpdatePresentationInput,
} from "@/schemas/app/presentation-schema";
import { Presentation } from "@prisma/client";

export const PRESENTATION_QUERY_KEYS = {
  all: ["presentations"],
  details: () => [...PRESENTATION_QUERY_KEYS.all, "detail"],
  detail: (id: string) => [...PRESENTATION_QUERY_KEYS.details(), id],
};

export function useAppPresentations() {
  const queryClient = useQueryClient();
  const { create, get, updatePartial } = appPresentationActions();

  function getPresentation(id: string): UseQueryResult<Presentation, Error> {
    const query = useQuery<Presentation, Error>({
      queryKey: PRESENTATION_QUERY_KEYS.detail(id),
      queryFn: () => get(id),
      enabled: !!id,
      onError: (error: Error) => {
        toast.error(error.message || API_MESSAGES.PRESENTATION.FETCH_ERROR);
      },
    } as UseQueryOptions<Presentation, Error>);
    return query;
  }

  function createPresentation() {
    return useMutation<Presentation, Error, AppCreatePresentationInput>({
      mutationFn: create,
      onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
      },
      onError: (error) => {
        toast.error(error.message || API_MESSAGES.PRESENTATION.CREATE_ERROR);
      },
    });
  }

  function updatePresentation() {
    return useMutation<
      Presentation,
      Error,
      { id: string; data: AppUpdatePresentationInput },
      { previousPresentation?: Presentation }
    >({
      mutationFn: ({ id, data }) => updatePartial(id, data),
      onMutate: async (variables) => {
        await queryClient.cancelQueries({
          queryKey: PRESENTATION_QUERY_KEYS.detail(variables.id),
        });
        const previousPresentation = queryClient.getQueryData<Presentation>(
          PRESENTATION_QUERY_KEYS.detail(variables.id)
        );
        if (previousPresentation) {
          const optimisticPresentation: Presentation = {
            ...previousPresentation,
            ...variables.data,
            slides: variables.data.slides ? (variables.data.slides as any) : previousPresentation.slides,
          };
          queryClient.setQueryData(
            PRESENTATION_QUERY_KEYS.detail(variables.id),
            optimisticPresentation
          );
        }
        return { previousPresentation };
      },
      onError: (err, variables, context) => {
        if (context?.previousPresentation) {
          queryClient.setQueryData(
            PRESENTATION_QUERY_KEYS.detail(variables.id),
            context.previousPresentation
          );
        }
        toast.error(err.message || API_MESSAGES.PRESENTATION.UPDATE_ERROR);
      },
      onSettled: (data) => {
        if (data) {
          queryClient.invalidateQueries({
            queryKey: PRESENTATION_QUERY_KEYS.detail(data.id),
          });
        }
      },
      onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
      },
    });
  }

  return {
    getPresentation,
    createPresentation,
    updatePresentation,
  };
}
