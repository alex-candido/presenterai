import { API_ENDPOINTS } from "@/config/endpoints";
import { api } from "@/lib/axios";
import {
    AppCreatePresentationInput,
    AppUpdatePresentationInput,
} from "@/schemas/app/presentation-schema";
import { Presentation } from "@prisma/client";

export function appPresentationActions() {
  async function create(
    data: AppCreatePresentationInput,
  ): Promise<Presentation> {
    const response = await api.post<Presentation>(API_ENDPOINTS.APP.PRESENTATIONS.CREATE, data);
    return response.data;
  }

  async function get(
    id: string,
  ): Promise<Presentation> {
    const response = await api.get<Presentation>(API_ENDPOINTS.APP.PRESENTATIONS.DETAIL(id));
    return response.data;
  }

  async function updatePartial(
    id: string,
    data: AppUpdatePresentationInput,
  ): Promise<Presentation> {
    const response = await api.patch<Presentation>(API_ENDPOINTS.APP.PRESENTATIONS.PARTIAL_UPDATE(id), data);
    return response.data;
  }

  return {
    create,
    get,
    updatePartial,
  };
}