import { useQuery } from "@tanstack/react-query";
import { getEmployeeDashboard } from "../api/dashboard-api";

export function useEmployeeDashboardQuery(employeeNumber = "EMP-1001") {
  return useQuery({
    queryKey: ["employee-dashboard", employeeNumber],
    queryFn: () => getEmployeeDashboard(employeeNumber),
  });
}
