import type { AdminContractAlertResponse, AdminEmployeeRecordResponse, AdminLeaveRequestResponse } from "../types/dashboard-api.types";
import type { Employee, EmployeeStatus, LeaveRequest, LeaveStatus } from "../types";

export function mapLeaveRequest(request: AdminLeaveRequestResponse): LeaveRequest {
  return {
    id: request.id,
    employee: request.employeeName,
    type: request.leaveType,
    dates: formatDateRange(request.startDate, request.endDate),
    days: request.requestedDays,
    balanceAfter: request.balanceAfterApproval,
    status: normalizeLeaveStatus(request.status),
  };
}

export function mapEmployeeRecord(employee: AdminEmployeeRecordResponse): Employee {
  return {
    id: employee.id,
    name: employee.name,
    role: employee.role,
    department: employee.department,
    location: employee.location,
    manager: employee.manager,
    status: normalizeEmployeeStatus(employee.status),
    leaveUsed: employee.leaveUsed,
    leaveTotal: employee.leaveTotal,
    contractEnds: employee.contractEnds,
  };
}

export function mapContractAlert(alert: AdminContractAlertResponse): Employee {
  return {
    id: alert.employeeId,
    name: alert.employeeName,
    role: alert.role,
    department: "",
    location: "",
    manager: "",
    status: "Contract review",
    leaveUsed: 0,
    leaveTotal: 0,
    contractEnds: alert.contractEnds,
  };
}

function normalizeEmployeeStatus(status: string): EmployeeStatus {
  return status === "Contract review" ? "Contract review" : status === "Probation" ? "Probation" : "Active";
}

function normalizeLeaveStatus(status: string): LeaveStatus {
  return status === "Approved" || status === "Rejected" ? status : "Pending";
}

function formatDateRange(startDate: string, endDate: string) {
  const start = formatShortDate(startDate);
  const end = formatShortDate(endDate);
  return start === end ? start : `${start} - ${end}`;
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short" }).format(new Date(`${value}T00:00:00`));
}
