import { getJson } from "@hr/shared";
import type { EmployeeDashboardResponse } from "../types/dashboard-api.types";

export function getEmployeeDashboard() {
  return getJson<EmployeeDashboardResponse>("/api/employees/dashboard");
}
