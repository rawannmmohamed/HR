import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import type { AuthSession, AuthStore } from "../types";

type AuthRequestConfig = InternalAxiosRequestConfig & {
  authRetry?: boolean;
};

type SetupAuthInterceptorsOptions = {
  apiClient: AxiosInstance;
  authStore: AuthStore;
  onUnauthenticated?: () => void;
};

let refreshSessionPromise: Promise<AuthSession> | null = null;

export function setupAuthInterceptors({
  apiClient,
  authStore,
  onUnauthenticated,
}: SetupAuthInterceptorsOptions) {
  apiClient.defaults.withCredentials = true;

  const requestInterceptorId = apiClient.interceptors.request.use((config) => {
    const accessToken = authStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  const responseInterceptorId = apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AuthRequestConfig | undefined;

      if (!originalRequest || shouldSkipRefresh(error, originalRequest)) {
        return Promise.reject(error);
      }

      originalRequest.authRetry = true;

      try {
        const session = await refreshSession(apiClient, authStore);
        originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        authStore.getState().clearSession();
        onUnauthenticated?.();
        return Promise.reject(refreshError);
      }
    },
  );

  return () => {
    apiClient.interceptors.request.eject(requestInterceptorId);
    apiClient.interceptors.response.eject(responseInterceptorId);
  };
}

function shouldSkipRefresh(error: AxiosError, originalRequest: AuthRequestConfig) {
  return error.response?.status !== 401 || originalRequest.authRetry || isAuthEndpoint(originalRequest.url);
}

function isAuthEndpoint(url?: string) {
  return Boolean(url?.includes("/api/auth/login") || url?.includes("/api/auth/refresh"));
}

async function refreshSession(apiClient: AxiosInstance, authStore: AuthStore) {
  refreshSessionPromise ??= apiClient
    .post<AuthSession>("/api/auth/refresh")
    .then((response) => {
      authStore.getState().setSession(response.data);
      return response.data;
    })
    .finally(() => {
      refreshSessionPromise = null;
    });

  return refreshSessionPromise;
}
