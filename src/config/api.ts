import axios, { AxiosInstance } from 'axios';
import { env } from "./envs";

export const api: AxiosInstance = axios.create({
  baseURL: env.NEXT_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});