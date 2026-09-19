import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

let refreshPromise: Promise<Tokens> | null = null;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const request = error.config as typeof error.config & { _retry?: boolean };

    if (
      error.response?.status === 401 &&
      request &&
      !request.url?.includes("/refresh") &&
      !request._retry
    ) {
      request._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("Refresh token is missing");
        }

        refreshPromise ??= refreshApi
          .get<Tokens>("/v1/auth/refresh", {
            headers: { Authorization: `Bearer ${refreshToken}` },
          })
          .then((response) => response.data)
          .finally(() => {
            refreshPromise = null;
          });

        const tokens = await refreshPromise;
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        request.headers = request.headers ?? {};
        request.headers.Authorization = `Bearer ${tokens.accessToken}`;

        return api(request);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.error("Refresh failed");
      }
    }

    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
