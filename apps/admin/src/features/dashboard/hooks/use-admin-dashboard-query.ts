import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard } from "../api/dashboard-api";

export function useAdminDashboardQuery() {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboard,
  });
}
