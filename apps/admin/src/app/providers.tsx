import { apiClient, bootstrapAuthSession, ReactQueryProvider, setupAuthInterceptors } from "@hr/shared";
import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";

let authInterceptorsReady = false;

function AuthBootstrap({ children }: { children: ReactNode }) {
  useEffect(() => {
    void bootstrapAuthSession(apiClient, useAuthStore);
  }, []);

  return children;
}

export function AppProviders({ children }: { children: ReactNode }) {
  if (!authInterceptorsReady) {
    setupAuthInterceptors({
      apiClient,
      authStore: useAuthStore,
    });
    authInterceptorsReady = true;
  }

  return (
    <ReactQueryProvider>
      <AuthBootstrap>{children}</AuthBootstrap>
    </ReactQueryProvider>
  );
}
