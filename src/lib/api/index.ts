import { serverEnv } from "@/config/server-envs";
import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: serverEnv.NEXT_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});