import { env } from "@/env";
import axios from "axios";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

if (env.VITE_API_ENABLE_DELAY) {
  api.interceptors.request.use(async (config) => {
    const milliseconds = Math.round(Math.random() * 3000);

    await new Promise((resolve) => setTimeout(resolve, milliseconds));

    return config;
  });
}
