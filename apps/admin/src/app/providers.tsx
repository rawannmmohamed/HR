import { apiClient, ReactQueryProvider, setupAuthInterceptors } from "@hr/shared";
import type { ReactNode } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";

let authInterceptorsReady = false;

export function AppProviders({ children }: { children: ReactNode }) {
  if (!authInterceptorsReady) {
    setupAuthInterceptors({
      apiClient,
      authStore: useAuthStore,
    });
    authInterceptorsReady = true;
  }

  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
