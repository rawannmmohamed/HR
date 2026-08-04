import { ProtectedRoutes as SharedProtectedRoutes } from "@hr/shared";
import { ROUTER_CONSTANTS } from "@/constants/routerConstants";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function ProtectedRoutes() {
  return <SharedProtectedRoutes allowedRole="Employee" authStore={useAuthStore} loginPath={ROUTER_CONSTANTS.AUTH.SIGN_IN} />;
}
