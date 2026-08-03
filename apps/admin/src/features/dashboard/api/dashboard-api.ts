import { getJson } from "@hr/shared";
import type { AdminDashboardResponse } from "../types/dashboard-api.types";

export function getAdminDashboard() {
  return getJson<AdminDashboardResponse>("/api/admin/dashboard");
}
