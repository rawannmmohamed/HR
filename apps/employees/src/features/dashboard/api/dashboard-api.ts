import { getJson } from "@hr/shared";
import type { EmployeeDashboardResponse } from "../types/dashboard-api.types";

export function getEmployeeDashboard(employeeNumber = "EMP-1001") {
  return getJson<EmployeeDashboardResponse>(`/api/employees/dashboard?employeeNumber=${encodeURIComponent(employeeNumber)}`);
}
