import { API_ENDPOINTS } from "@/config/endpoints";
import { api } from "@/lib/api";

export function adminUserActions() {
  async function list(params?: {
    page?: number;
    page_size?: number;
    [key: string]: unknown;
  }): Promise<UserListResponse> {
    const response = await api.get<UserListResponse>(API_ENDPOINTS.USERS.LIST, {
      params,
    });
    return response.data;
  }

  async function create(
    data: UserInput,
  ): Promise<IUser> {
    const response = await api.post<IUser>(API_ENDPOINTS.USERS.CREATE, data);
    return response.data;
  }

  async function get(
    id: number | string,
  ): Promise<IUser> {
    const response = await api.get<IUser>(API_ENDPOINTS.USERS.DETAIL(id));
    return response.data;
  }

  async function update(
    id: number,
    data: UserInput,
  ): Promise<IUser> {
    const response = await api.put<IUser>(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  }

  async function updatePartial(
    id: number,
    data: Partial<UserInput>,
  ): Promise<IUser> {
    const response = await api.patch<IUser>(API_ENDPOINTS.USERS.PARTIAL_UPDATE(id), data);
    return response.data;
  }

  async function destroy(id: number): Promise<void> {
    await api.delete(API_ENDPOINTS.USERS.DELETE(id));
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
