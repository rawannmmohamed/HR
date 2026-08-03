import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import { ApiError } from "../api";

type QueryErrorState = {
  message: string;
  status?: number;
};

type ReactQueryProviderProps = {
  children: ReactNode;
};

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [error, setError] = useState<QueryErrorState | null>(null);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (queryError, query) => {
            if (query.meta?.suppressGlobalError) {
              return;
            }

            setError(getQueryErrorState(queryError));
          },
        }),
        mutationCache: new MutationCache({
          onError: (mutationError, _variables, _context, mutation) => {
            if (mutation.meta?.suppressGlobalError) {
              return;
            }

            setError(getQueryErrorState(mutationError));
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
      {error ? (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-lg border border-destructive/30 bg-card px-4 py-3 text-sm shadow-xl dark:border-red-400/20 dark:bg-[#141417]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground dark:text-white">Request failed</p>
              <p className="mt-1 text-muted-foreground dark:text-[#9ca3af]">{error.message}</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground dark:text-[#9ca3af] dark:hover:text-white" type="button" onClick={() => setError(null)}>
              Dismiss
            </button>
          </div>
        </div>
      ) : null}
    </QueryClientProvider>
  );
}

function getQueryErrorState(error: unknown): QueryErrorState {
  if (error instanceof ApiError) {
    return {
      message: error.status ? `Server returned ${error.status}.` : error.message,
      status: error.status,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Something went wrong.",
  };
}
