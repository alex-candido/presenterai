import { API_ENDPOINTS } from "@/config/endpoints";
import { api } from "@/lib/api";

export function presentationActions() {
  async function list(params?: {
    page?: number;
    page_size?: number;
    [key: string]: unknown;
  }): Promise<PresentationListResponse> {
    const response = await api.get<PresentationListResponse>(API_ENDPOINTS.PRESENTATIONS.LIST, {
      params,
    });
    return response.data;
  }

  async function create(
    data: PresentationInput,
  ): Promise<IPresentation> {
    const response = await api.post<IPresentation>(API_ENDPOINTS.PRESENTATIONS.CREATE, data);
    return response.data;
  }

  async function get(
    id: number | string,
  ): Promise<IPresentation> {
    const response = await api.get<IPresentation>(API_ENDPOINTS.PRESENTATIONS.DETAIL(id));
    return response.data;
  }

  async function update(
    id: number,
    data: PresentationInput,
  ): Promise<IPresentation> {
    const response = await api.put<IPresentation>(API_ENDPOINTS.PRESENTATIONS.UPDATE(id), data);
    return response.data;
  }

  async function updatePartial(
    id: number,
    data: Partial<PresentationInput>,
  ): Promise<IPresentation> {
    const response = await api.patch<IPresentation>(API_ENDPOINTS.PRESENTATIONS.PARTIAL_UPDATE(id), data);
    return response.data;
  }

  async function destroy(id: number): Promise<void> {
    await api.delete(API_ENDPOINTS.PRESENTATIONS.DELETE(id));
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
