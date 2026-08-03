import { ReactQueryProvider } from "@hr/shared";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
