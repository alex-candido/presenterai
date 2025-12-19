

import { API_ENDPOINTS } from "@/config/endpoints";
import { api } from "@/lib/api";
import { StartSchema } from "@/schemas/start-schema";

export function documentActions() {
  async function list(params?: {
    page?: number;
    page_size?: number;
    [key: string]: unknown;
  }): Promise<DocumentListResponse> {
    const response = await api.get<DocumentListResponse>(API_ENDPOINTS.DOCUMENTS.LIST, {
      params,
    });
    return response.data;
  }

  async function create(
    data: StartSchema,
  ): Promise<StartSchema> {
    const response = await api.post<StartSchema>('/api/v1/documents', data);
    return response.data;
  }

  async function get(
    id: number | string,
  ): Promise<IDocument> {
    const response = await api.get<IDocument>(API_ENDPOINTS.DOCUMENTS.DETAIL(id));
    return response.data;
  }

  async function update(
    id: number,
    data: DocumentInput,
  ): Promise<IDocument> {
    const response = await api.put<IDocument>(API_ENDPOINTS.DOCUMENTS.UPDATE(id), data);
    return response.data;
  }

  async function updatePartial(
    id: number,
    data: Partial<DocumentInput>,
  ): Promise<IDocument> {
    const response = await api.patch<IDocument>(API_ENDPOINTS.DOCUMENTS.PARTIAL_UPDATE(id), data);
    return response.data;
  }

  async function destroy(id: number): Promise<void> {
    await api.delete(API_ENDPOINTS.DOCUMENTS.DELETE(id));
    return;
  }

  return {
    list,
    create,
    get,
    update,
    updatePartial,
    destroy,
  };
}
