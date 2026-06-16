export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `/auth/login/`,
    LOGOUT: `/auth/logout/`,
    REGISTER: `/auth/register/`,
    FORGOT_PASSWORD: `/auth/forgot-password/`,
    RESET_PASSWORD: `/auth/reset-password/`,
  },
  ADMIN: {
    USERS: {
      LIST: `/admin/users/`,
      CREATE: `/admin/users/`,
      DETAIL: (id: number | string) => `/admin/users/${id}/`,
      UPDATE: (id: number | string) => `/admin/users/${id}/`,
      PARTIAL_UPDATE: (id: number | string) => `/admin/users/${id}/`,
      DELETE: (id: number | string) => `/admin/users/${id}/`,
    },
    DOCUMENTS: {
      LIST: `/admin/documents/`,
      CREATE: `/admin/documents/`,
      DETAIL: (id: number | string) => `/admin/documents/${id}/`,
      UPDATE: (id: number | string) => `/admin/documents/${id}/`,
      PARTIAL_UPDATE: (id: number | string) => `/admin/documents/${id}/`,
      DELETE: (id: number | string) => `/admin/documents/${id}/`,
    },
    GENERATIONS: {
      LIST: `/admin/generations/`,
      CREATE: `/admin/generations/`,
      DETAIL: (id: number | string) => `/admin/generations/${id}/`,
      UPDATE: (id: number | string) => `/admin/generations/${id}/`,
      PARTIAL_UPDATE: (id: number | string) => `/admin/generations/${id}/`,
      DELETE: (id: number | string) => `/admin/generations/${id}/`,
    },
    PRESENTATIONS: {
      LIST: `/admin/presentations/`,
      CREATE: `/admin/presentations/`,
      DETAIL: (id: number | string) => `/admin/presentations/${id}/`,
      UPDATE: (id: number | string) => `/admin/presentations/${id}/`,
      PARTIAL_UPDATE: (id: number | string) => `/admin/presentations/${id}/`,
      DELETE: (id: number | string) => `/admin/presentations/${id}/`,
    },
  },
  APP: {
    GENERATIONS: {
      LIST: `/app/generations/`,
      CREATE: `/app/generations/`,
      DETAIL: (id: number | string) => `/app/generations/${id}/`,
      UPDATE: (id: number | string) => `/app/generations/${id}/`,
      PARTIAL_UPDATE: (id: number | string) => `/app/generations/${id}/`,
      DELETE: (id: number | string) => `/app/generations/${id}/`,
    },
    PRESENTATIONS: {
      LIST: `/app/presentations/`,
      CREATE: `/app/presentations/`,
      DETAIL: (id: number | string) => `/app/presentations/${id}/`,
      UPDATE: (id: number | string) => `/app/presentations/${id}/`,
      PARTIAL_UPDATE: (id: number | string) => `/app/presentations/${id}/`,
      DELETE: (id: number | string) => `/app/presentations/${id}/`,
    },
  }
};
