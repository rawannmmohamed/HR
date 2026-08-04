import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ROUTER_CONSTANTS } from "@/constants/routerConstants";
import { logout } from "../api/auth-api";
import { useAuthStore } from "../store/auth-store";

export function useLogout() {
  const navigate = useNavigate();
  const clearSession = useAuthStore((state) => state.clearSession);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearSession();
      navigate(ROUTER_CONSTANTS.AUTH.SIGN_IN, { replace: true });
    },
    meta: {
      errorMessage: "Sign out failed",
      successMessage: "Signed out",
    },
  });

  return () => {
    logoutMutation.mutate();
  };
}
