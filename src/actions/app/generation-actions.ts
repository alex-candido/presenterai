import { API_ENDPOINTS } from "@/config/endpoints";
import { api } from "@/lib/axios";
import {
    AppCreateGenerationInput,
    AppUpdateGenerationInput,
} from "@/schemas/app/generation-schema";
import { Generation } from "@prisma/client";

export function appGenerationActions() {
  async function create(
    data: AppCreateGenerationInput,
  ): Promise<Generation> {
    const response = await api.post<Generation>(API_ENDPOINTS.APP.GENERATIONS.CREATE, data);
    return response.data;
  }

  async function get(
    id: string,
  ): Promise<Generation> {
    const response = await api.get<Generation>(API_ENDPOINTS.APP.GENERATIONS.DETAIL(id));
    return response.data;
  }

  async function updatePartial(
    id: string,
    data: AppUpdateGenerationInput,
  ): Promise<Generation> {
    const response = await api.patch<Generation>(API_ENDPOINTS.APP.GENERATIONS.PARTIAL_UPDATE(id), data);
    return response.data;
  }

  return {
    create,
    get,
    updatePartial,
  };
}