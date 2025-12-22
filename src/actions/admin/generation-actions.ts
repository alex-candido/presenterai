import { API_ENDPOINTS } from "@/config/endpoints";
import { api } from "@/lib/api";

export function adminGenerationActions() {
  async function list(params?: {
    page?: number;
    page_size?: number;
    [key: string]: unknown;
  }): Promise<GenerationListResponse> {
    const response = await api.get<GenerationListResponse>(API_ENDPOINTS.GENERATIONS.LIST, {
      params,
    });
    return response.data;
  }

  async function create(
    data: GenerationInput,
  ): Promise<IGeneration> {
    const response = await api.post<IGeneration>(API_ENDPOINTS.GENERATIONS.CREATE, data);
    return response.data;
  }

  async function get(
    id: number | string,
  ): Promise<IGeneration> {
    const response = await api.get<IGeneration>(API_ENDPOINTS.GENERATIONS.DETAIL(id));
    return response.data;
  }

  async function update(
    id: number,
    data: GenerationInput,
  ): Promise<IGeneration> {
    const response = await api.put<IGeneration>(API_ENDPOINTS.GENERATIONS.UPDATE(id), data);
    return response.data;
  }

  async function updatePartial(
    id: number,
    data: Partial<GenerationInput>,
  ): Promise<IGeneration> {
    const response = await api.patch<IGeneration>(API_ENDPOINTS.GENERATIONS.PARTIAL_UPDATE(id), data);
    return response.data;
  }

  async function destroy(id: number): Promise<void> {
    await api.delete(API_ENDPOINTS.GENERATIONS.DELETE(id));
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
