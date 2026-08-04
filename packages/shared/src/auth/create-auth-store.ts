import { create } from "zustand";
import type { AuthState } from "./types";

export function createAuthStore() {
  return create<AuthState>((set) => ({
    accessToken: null,
    accessTokenExpiresAtUtc: null,
    user: null,
    status: "checking",
    setChecking: () => set({ status: "checking" }),
    setSession: (session) =>
      set({
        accessToken: session.accessToken,
        accessTokenExpiresAtUtc: session.accessTokenExpiresAtUtc,
        user: session.user,
        status: "authenticated",
      }),
    clearSession: () =>
      set({
        accessToken: null,
        accessTokenExpiresAtUtc: null,
        user: null,
        status: "unauthenticated",
      }),
  }));
}
