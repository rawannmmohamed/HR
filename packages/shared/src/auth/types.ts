import type { StoreApi, UseBoundStore } from "zustand";

export type AuthRole = "HR Admin" | "Employee";

export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export type CurrentUser = {
  id: string;
  email: string;
  role: AuthRole;
  employeeId: string | null;
  employeeNumber: string | null;
  displayName: string | null;
};

export type AuthSession = {
  accessToken: string;
  accessTokenExpiresAtUtc: string;
  user: CurrentUser;
};

export type AuthState = {
  accessToken: string | null;
  accessTokenExpiresAtUtc: string | null;
  user: CurrentUser | null;
  status: AuthStatus;
  setChecking: () => void;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
};

export type AuthStore = UseBoundStore<StoreApi<AuthState>>;
