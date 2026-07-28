import { BarChart3, CalendarCheck, Clock3, FileWarning, LayoutDashboard, UserCheck, UsersRound } from "lucide-react";
import type { AdminDashboardNavItem, AdminSummaryCard } from "./types";

export const adminDashboardUser = {
  name: "HR Admin",
  dateLabel: "Tuesday, July 28, 2026",
  notificationCount: 3,
};

export const adminDashboardNavItems: AdminDashboardNavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Employees", icon: UsersRound },
  { label: "Attendance", icon: Clock3 },
  { label: "Leave approvals", icon: CalendarCheck, badge: "2" },
  { label: "Contracts", icon: FileWarning, badge: "1" },
  { label: "Reports", icon: BarChart3 },
];

export const adminSummaryCards: AdminSummaryCard[] = [
  { id: "activeEmployees", label: "Active employees", icon: UsersRound, tone: "violet" },
  { id: "leavePending", label: "Leave approvals", icon: CalendarCheck, tone: "amber" },
  { id: "attendanceExceptions", label: "Attendance exceptions", icon: UserCheck, tone: "emerald" },
  { id: "contractsExpiring", label: "Contracts expiring", icon: FileWarning, tone: "rose" },
];
