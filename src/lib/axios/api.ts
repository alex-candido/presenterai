import { env } from "@/config/env";
import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: env.NEXT_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});