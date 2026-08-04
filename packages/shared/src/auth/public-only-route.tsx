import { Navigate, Outlet } from "react-router";
import type { AuthRole, AuthStore } from "./types";

type PublicOnlyRouteProps = {
  allowedRole: AuthRole;
  authStore: AuthStore;
  dashboardPath: string;
};

export function PublicOnlyRoute({ allowedRole, authStore, dashboardPath }: PublicOnlyRouteProps) {
  const { status, user } = authStore();

  if (status === "checking") {
    return null;
  }

  if (status === "authenticated" && user?.role === allowedRole) {
    return <Navigate to={dashboardPath} replace />;
  }

  return <Outlet />;
}
