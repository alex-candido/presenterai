import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { documentActions } from "@/actions/admin/document-actions";
import { API_MESSAGES } from "@/config/messages";

export const DOCUMENT_QUERY_KEYS = {
  all: ["documents"],
  lists: () => [...DOCUMENT_QUERY_KEYS.all, "list"],
  list: (filters: object) => [...DOCUMENT_QUERY_KEYS.lists(), filters],
  details: () => [...DOCUMENT_QUERY_KEYS.all, "detail"],
  detail: (id: number | string) => [...DOCUMENT_QUERY_KEYS.details(), id],
};

export function useAdminDocuments() {
  const queryClient = useQueryClient();
  const { list, create, get, update, updatePartial, destroy } = documentActions();

  function listDocuments(params?: DocumentListParams): UseQueryResult<DocumentListResponse, Error> {
    const { ...filters } = params || {};
    const queryKey = DOCUMENT_QUERY_KEYS.list(filters);

    const query = useQuery<DocumentListResponse, Error>({
      queryKey,
      queryFn: () => list(filters),
      staleTime: params?.staleTime ?? 1000 * 60 * 5, 
      onError: (error: Error) => {
        toast.error(error.message || API_MESSAGES.DOCUMENT.FETCH_ERROR);
      },
    } as UseQueryOptions<DocumentListResponse, Error>);
    return query;
  }

  function getDocument(id: number | string): UseQueryResult<IDocument, Error> {
    const query = useQuery<IDocument, Error>({
      queryKey: DOCUMENT_QUERY_KEYS.detail(id),
      queryFn: () => get(id),
      enabled: !!id,
      onError: (error: Error) => {
        toast.error(error.message || API_MESSAGES.DOCUMENT.FETCH_ERROR);
      },
    } as UseQueryOptions<IDocument, Error>);
    return query;
  }

  function createDocument() {
    return useMutation<StartSchema, Error, StartSchema>({
      mutationFn: create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: DOCUMENT_QUERY_KEYS.lists() });
        toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
      },
      onError: (error) => {
        toast.error(error.message || API_MESSAGES.DOCUMENT.CREATE_ERROR);
      },
    });
  }

  function updateDocument() {
    return useMutation<
      IDocument,
      Error,
      { id: number; data: DocumentInput },
      { previousDocument?: IDocument }
    >({
      mutationFn: ({ id, data }) => update(id, data),
      onMutate: async (variables) => {
        await queryClient.cancelQueries({ queryKey: DOCUMENT_QUERY_KEYS.detail(variables.id) });
        const previousDocument = queryClient.getQueryData<IDocument>(DOCUMENT_QUERY_KEYS.detail(variables.id));
        if (previousDocument) {
          const optimisticDocument: IDocument = { ...previousDocument, ...variables.data };
          queryClient.setQueryData(DOCUMENT_QUERY_KEYS.detail(variables.id), optimisticDocument);
        }
        return { previousDocument };
      },
      onError: (err, variables, context) => {
        if (context?.previousDocument) {
          queryClient.setQueryData(DOCUMENT_QUERY_KEYS.detail(variables.id), context.previousDocument);
        }
        toast.error(err.message || API_MESSAGES.DOCUMENT.UPDATE_ERROR);
      },
      onSettled: (data) => {
        queryClient.invalidateQueries({ queryKey: DOCUMENT_QUERY_KEYS.lists() });
        if (data) {
          queryClient.invalidateQueries({ queryKey: DOCUMENT_QUERY_KEYS.detail(data.id) });
        }
      },
       onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
      }
    });
  }

  function updatePartialDocument() {
    return useMutation<
      IDocument,
      Error,
      { id: number; data: Partial<DocumentInput> },
      { previousDocument?: IDocument }
    >({
      mutationFn: ({ id, data }) => updatePartial(id, data),
      onMutate: async (variables) => {
        await queryClient.cancelQueries({ queryKey: DOCUMENT_QUERY_KEYS.detail(variables.id) });
        const previousDocument = queryClient.getQueryData<IDocument>(DOCUMENT_QUERY_KEYS.detail(variables.id));
        if (previousDocument) {
          const optimisticDocument: IDocument = { ...previousDocument, ...variables.data };
          queryClient.setQueryData(DOCUMENT_QUERY_KEYS.detail(variables.id), optimisticDocument);
        }
        return { previousDocument };
      },
      onError: (err, variables, context) => {
        if (context?.previousDocument) {
          queryClient.setQueryData(DOCUMENT_QUERY_KEYS.detail(variables.id), context.previousDocument);
        }
        toast.error(err.message || API_MESSAGES.DOCUMENT.UPDATE_ERROR);
      },
      onSettled: (data) => {
        queryClient.invalidateQueries({ queryKey: DOCUMENT_QUERY_KEYS.lists() });
        if (data) {
          queryClient.invalidateQueries({ queryKey: DOCUMENT_QUERY_KEYS.detail(data.id) });
        }
      },
      onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.UPDATE_SUCCESS);
      }
    });
  }

  function destroyDocument() {
    return useMutation<void, Error, number>({
      mutationFn: destroy,
      onError: (error) => {
        toast.error(error.message || API_MESSAGES.DOCUMENT.DELETE_ERROR);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: DOCUMENT_QUERY_KEYS.lists() });
      },
       onSuccess: () => {
        toast.success(API_MESSAGES.COMMON.DELETE_SUCCESS);
      }
    });
  }

  return {
    listDocuments,
    getDocument,
    createDocument,
    updateDocument,
    updatePartialDocument,
    destroyDocument,
  };
}