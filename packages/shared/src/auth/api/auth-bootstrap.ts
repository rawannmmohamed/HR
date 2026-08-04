import type { AxiosInstance } from "axios";
import type { AuthSession, AuthStore } from "../types";

export async function bootstrapAuthSession(apiClient: AxiosInstance, authStore: AuthStore) {
  if (authStore.getState().status === "authenticated") {
    return;
  }

  authStore.getState().setChecking();

  try {
    const response = await apiClient.post<AuthSession>("/api/auth/refresh");
    authStore.getState().setSession(response.data);
  } catch {
    if (authStore.getState().status !== "authenticated") {
      authStore.getState().clearSession();
    }
  }
}
