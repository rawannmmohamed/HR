import type { AuthRole } from "./types";

export const AUTH_ROLES = {
  HR_ADMIN: "HR Admin",
  EMPLOYEE: "Employee",
} as const satisfies Record<string, AuthRole>;
