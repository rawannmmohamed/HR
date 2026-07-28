import type { EmployeeStatus, LeaveStatus, StatusTone } from "../types";

export function statusVariant(status: EmployeeStatus | LeaveStatus): StatusTone {
  if (status === "Active" || status === "Approved") return "success";
  if (status === "Pending" || status === "Probation") return "warning";
  if (status === "Rejected" || status === "Contract review") return "danger";
  return "default";
}
