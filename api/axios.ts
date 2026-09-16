import axios from "axios";
import { toast } from "sonner";

import { refresh } from "./requests";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
 async (error) => {
    if (error.response.status === 401) {
  
      try {
        const tokens = await refresh();
        localStorage.setItem("accessToken" , tokens.accessToken )
        localStorage.setItem("refreshToken" , tokens.refreshToken )
      } catch {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        toast.error("Refresh failed")
      }
    }
    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
