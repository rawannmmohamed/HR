import { apiClient } from "@hr/shared";
import type { AuthSession, LoginFormValues } from "../types/auth.types";

export async function login(request: LoginFormValues) {
  const response = await apiClient.post<AuthSession>("/api/auth/login", request);
  return response.data;
}

export async function logout() {
  await apiClient.post("/api/auth/logout");
}
