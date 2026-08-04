import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ROUTER_CONSTANTS } from "@/constants/routerConstants";
import { login, logout } from "../api/auth-api";
import { useAuthStore } from "../store/auth-store";
import type { LoginFormValues } from "../types/auth.types";

export function useLogin() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const session = await login(values);

      if (session.user.role !== "Employee") {
        await logout();
        throw new Error("This account cannot access the employee portal.");
      }

      return session;
    },
    onSuccess: (session) => {
      setSession(session);
      navigate(ROUTER_CONSTANTS.DASHBOARD.DASHBOARD, { replace: true });
    },
  });
}
