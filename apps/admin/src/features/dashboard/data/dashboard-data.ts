import type { AttendanceSummaryRow, Employee, LeaveRequest } from "../types";

export const employees: Employee[] = [
  {
    id: "EMP-1042",
    name: "Nour Hassan",
    role: "People Operations Lead",
    department: "HR",
    location: "Cairo",
    manager: "Rana Youssef",
    status: "Active",
    leaveUsed: 8,
    leaveTotal: 21,
    contractEnds: "2027-05-31",
  },
  {
    id: "EMP-1087",
    name: "Omar Nabil",
    role: "Frontend Engineer",
    department: "Product",
    location: "Alexandria",
    manager: "Karim Adel",
    status: "Active",
    leaveUsed: 14,
    leaveTotal: 21,
    contractEnds: "2026-11-18",
  },
  {
    id: "EMP-1120",
    name: "Mariam Samir",
    role: "Account Executive",
    department: "Sales",
    location: "Dubai",
    manager: "Lina Maher",
    status: "Contract review",
    leaveUsed: 17,
    leaveTotal: 21,
    contractEnds: "2026-08-14",
  },
  {
    id: "EMP-1184",
    name: "Youssef Galal",
    role: "QA Analyst",
    department: "Delivery",
    location: "Remote",
    manager: "Karim Adel",
    status: "Probation",
    leaveUsed: 3,
    leaveTotal: 15,
    contractEnds: "2027-01-10",
  },
];

export const leaveRequests: LeaveRequest[] = [
  {
    id: "LR-2301",
    employee: "Omar Nabil",
    type: "Annual leave",
    dates: "Aug 4 - Aug 7",
    days: 4,
    balanceAfter: 3,
    status: "Pending",
  },
  {
    id: "LR-2302",
    employee: "Mariam Samir",
    type: "Emergency leave",
    dates: "Jul 30",
    days: 1,
    balanceAfter: 3,
    status: "Pending",
  },
  {
    id: "LR-2303",
    employee: "Youssef Galal",
    type: "Sick leave",
    dates: "Jul 28",
    days: 1,
    balanceAfter: 11,
    status: "Approved",
  },
];

export const attendanceRows: AttendanceSummaryRow[] = [
  { label: "Present today", value: 42, note: "92% of active staff", tone: "success" },
  { label: "Late check-ins", value: 3, note: "Needs HR review", tone: "warning" },
  { label: "Remote today", value: 11, note: "Across 4 departments", tone: "default" },
  { label: "Missing checkout", value: 2, note: "Auto reminder queued", tone: "danger" },
];
