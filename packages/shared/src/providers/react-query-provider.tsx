import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import { ApiError } from "../api";
import { ToastViewport, type ToastMessage } from "../components/ui/toast";
import { getErrorToastMessage } from "./query-error-messages";
import { getQueryMessageMeta } from "./query-meta";

type ReactQueryProviderProps = {
  children: ReactNode;
};

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  function showToast(toast: Omit<ToastMessage, "id">) {
    const id = crypto.randomUUID();
    setToasts((currentToasts) => [...currentToasts.slice(-2), { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((currentToast) => currentToast.id !== id));
    }, 5000);
  }

  function dismissToast(id: string) {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (queryError, query) => {
            const meta = getQueryMessageMeta(query.meta);

            if (meta.suppressGlobalError) {
              return;
            }

            const errorToast = getErrorToastMessage(queryError);
            showToast({
              title: meta.errorMessage || errorToast.title,
              description: meta.errorMessage ? errorToast.description : errorToast.description,
              variant: "error",
            });
          },
        }),
        mutationCache: new MutationCache({
          onSuccess: (_data, _variables, _context, mutation) => {
            const meta = getQueryMessageMeta(mutation.meta);

            if (!meta.successMessage) {
              return;
            }

            showToast({
              title: meta.successMessage,
              variant: "success",
            });
          },
          onError: (mutationError, _variables, _context, mutation) => {
            const meta = getQueryMessageMeta(mutation.meta);

            if (meta.suppressGlobalError) {
              return;
            }

            const errorToast = getErrorToastMessage(mutationError);
            showToast({
              title: meta.errorMessage || errorToast.title,
              description: meta.errorMessage ? errorToast.description : errorToast.description,
              variant: "error",
            });
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, queryError) => {
              if (queryError instanceof ApiError && queryError.status >= 400 && queryError.status < 500) {
                return false;
              }

              return failureCount < 1;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </QueryClientProvider>
  );
}
