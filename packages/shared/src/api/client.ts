import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export class ApiError extends Error {
  readonly data: unknown;
  readonly status: number;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.data = data;
    this.status = status;
  }
}

const defaultApiBaseUrl = "http://localhost:5132";

export function getApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return configuredBaseUrl?.replace(/\/$/, "") || defaultApiBaseUrl;
}

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: "application/json",
  },
});

export async function getJson<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse> {
  try {
    const response = await apiClient.get<TResponse>(path, config);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiError(error.message, error.response?.status ?? 0, error.response?.data);
    }

    throw error;
  }
}
