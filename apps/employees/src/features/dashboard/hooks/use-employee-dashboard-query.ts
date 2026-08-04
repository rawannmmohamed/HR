import { useQuery } from "@tanstack/react-query";
import { getEmployeeDashboard } from "../api/dashboard-api";

export function useEmployeeDashboardQuery() {
  return useQuery({
    queryKey: ["employee-dashboard"],
    queryFn: getEmployeeDashboard,
    meta: {
      errorMessage: "Could not load your dashboard",
    },
  });
}
