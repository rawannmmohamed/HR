import type { WorkspaceSearchItem } from "@hr/shared";
import type { AdminSummaryCardId, AttendanceSummaryRow, Employee, LeaveRequest } from "../types";

type BuildAdminDashboardSearchItemsParams = {
  attendanceRows: AttendanceSummaryRow[];
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  summaryValues: Record<AdminSummaryCardId, string>;
};

export function buildAdminDashboardSearchItems({
  attendanceRows,
  employees,
  leaveRequests,
  summaryValues,
}: BuildAdminDashboardSearchItemsParams): WorkspaceSearchItem[] {
  return [
    {
      category: "Summary",
      label: "Active employees",
      description: `${summaryValues.activeEmployees} employees currently tracked`,
      keywords: ["headcount", "people", "staff"],
    },
    {
      category: "Summary",
      label: "Leave approvals",
      description: `${summaryValues.leavePending} pending requests need HR action`,
      keywords: ["pto", "pending", "requests"],
    },
    {
      category: "Summary",
      label: "Contract alerts",
      description: `${summaryValues.contractsExpiring} contracts marked for review`,
      keywords: ["expiry", "contract review"],
    },
    ...leaveRequests.map((request) => ({
      category: "Leave",
      label: `${request.employee} - ${request.type}`,
      description: `${request.dates}, ${request.days} days, ${request.status}. Balance after approval: ${request.balanceAfter} days`,
      keywords: [request.id, request.employee, request.type, request.status],
    })),
    ...attendanceRows.map((row) => ({
      category: "Attendance",
      label: row.label,
      description: `${row.value} - ${row.note}`,
      keywords: [row.tone],
    })),
    ...employees.map((employee) => ({
      category: "Employees",
      label: employee.name,
      description: `${employee.role}, ${employee.department}, ${employee.location}. ${employee.status}. Contract ends ${employee.contractEnds}`,
      keywords: [employee.id, employee.manager, employee.status, employee.department, employee.location],
    })),
  ];
}
