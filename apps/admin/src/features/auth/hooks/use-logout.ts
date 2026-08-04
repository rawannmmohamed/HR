import { useNavigate } from "react-router";
import { ROUTER_CONSTANTS } from "@/constants/routerConstants";
import { logout } from "../api/auth-api";
import { useAuthStore } from "../store/auth-store";

export function useLogout() {
  const navigate = useNavigate();
  const clearSession = useAuthStore((state) => state.clearSession);

  return async () => {
    try {
      await logout();
    } finally {
      clearSession();
      navigate(ROUTER_CONSTANTS.AUTH.SIGN_IN, { replace: true });
    }
  };
}
