import type { ElementType } from "react";

export type EmployeeStatus = "Active" | "Probation" | "Contract review";
export type LeaveStatus = "Pending" | "Approved" | "Rejected";
export type StatusTone = "default" | "success" | "warning" | "danger";
export type AdminSummaryCardId = "activeEmployees" | "leavePending" | "attendanceExceptions" | "contractsExpiring";
export type SummaryTone = "violet" | "amber" | "emerald" | "rose";

export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  manager: string;
  status: EmployeeStatus;
  leaveUsed: number;
  leaveTotal: number;
  contractEnds: string;
};

export type LeaveRequest = {
  id: string;
  employee: string;
  type: string;
  dates: string;
  days: number;
  balanceAfter: number;
  status: LeaveStatus;
};

export type AttendanceSummaryRow = {
  label: string;
  value: number;
  note: string;
  tone: StatusTone;
};

export type AdminDashboardNavItem = {
  label: string;
  icon: ElementType;
  badge?: string;
};

export type AdminSummaryCard = {
  id: AdminSummaryCardId;
  label: string;
  icon: ElementType;
  tone: SummaryTone;
};

export type AdminSummaryCardsProps = {
  cards: AdminSummaryCard[];
  values: Record<AdminSummaryCardId, string>;
};

export type LeaveApprovalsPanelProps = {
  requests: LeaveRequest[];
};

export type AttendanceReviewPanelProps = {
  rows: AttendanceSummaryRow[];
};

export type EmployeeRecordsPanelProps = {
  employees: Employee[];
};

export type ContractAlertsPanelProps = {
  employees: Employee[];
};
