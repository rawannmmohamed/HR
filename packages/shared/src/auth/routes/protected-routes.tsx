import { Navigate, Outlet } from "react-router";
import type { AuthRole, AuthStore } from "../types";

type ProtectedRoutesProps = {
  allowedRole: AuthRole;
  authStore: AuthStore;
  loginPath: string;
};

export function ProtectedRoutes({ allowedRole, authStore, loginPath }: ProtectedRoutesProps) {
  const { status, user } = authStore();

  if (status === "checking") {
    return null;
  }

  if (status !== "authenticated" || user?.role !== allowedRole) {
    return <Navigate to={loginPath} replace />;
  }

  return <Outlet />;
}
