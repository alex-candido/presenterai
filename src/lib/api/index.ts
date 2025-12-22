import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
});