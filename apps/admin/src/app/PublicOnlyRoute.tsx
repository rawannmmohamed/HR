import { PublicOnlyRoute as SharedPublicOnlyRoute } from "@hr/shared";
import { ROUTER_CONSTANTS } from "@/constants/routerConstants";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function PublicOnlyRoute() {
  return <SharedPublicOnlyRoute allowedRole="HR Admin" authStore={useAuthStore} dashboardPath={ROUTER_CONSTANTS.DASHBOARD.DASHBOARD} />;
}
