import { Briefcase, Clock3, Grid2X2, UsersRound, WalletCards, WalletMinimal } from "lucide-react";
import type { EmployeeDashboardNavItem, EmployeeSummaryCard, LeaveBalance, PersonOffToday } from "./types";

export const employeeDashboardUser = {
  name: "Rawan",
  dateLabel: "Tuesday, July 28, 2026",
  notificationCount: 5,
};

export const employeeDashboardNavItems: EmployeeDashboardNavItem[] = [
  { label: "Dashboard", icon: Grid2X2 },
  { label: "My Requests", icon: Briefcase },
  { label: "Permissions", icon: Clock3 },
  { label: "Balances", icon: WalletMinimal },
  { label: "Who's Off", icon: UsersRound },
];

export const employeeSummaryCards: EmployeeSummaryCard[] = [
  { label: "Days available", value: "26.5", icon: WalletCards, tone: "violet" },
  { label: "Used this year", value: "1", icon: Grid2X2, tone: "violet" },
  { label: "Pending requests", value: "0", icon: Clock3, tone: "amber" },
  { label: "Teammates off today", value: "1", icon: UsersRound, tone: "emerald" },
];

export const leaveBalances: LeaveBalance[] = [
  {
    label: "Annual Leave",
    value: "8.5",
    details: "8.5 days left",
    usage: "0/0",
    accentClassName: "bg-blue-400",
    progress: 0,
  },
  {
    label: "Sick Leave",
    value: "2",
    details: "2 days left",
    usage: "1/0",
    accentClassName: "bg-rose-400",
    progress: 10,
  },
  {
    label: "Casual Leave",
    value: "5",
    details: "5 days left",
    usage: "0/5",
    policyCap: "POLICY CAP",
    accentClassName: "bg-sky-400",
    progress: 0,
  },
  {
    label: "Compassionate Leave",
    value: "3",
    details: "3 days left",
    usage: "0/3",
    policyCap: "POLICY CAP",
    accentClassName: "bg-slate-400",
    progress: 0,
  },
  {
    label: "Emergency Leave",
    value: "3",
    details: "3 days left",
    usage: "0/3",
    policyCap: "POLICY CAP",
    accentClassName: "bg-slate-400",
    progress: 0,
  },
  {
    label: "Marriage Leave",
    value: "5",
    details: "5 days left",
    usage: "0/5",
    policyCap: "POLICY CAP",
    accentClassName: "bg-pink-500",
    progress: 0,
  },
];

export const peopleOffToday: PersonOffToday[] = [
  {
    name: "Ahmed Dahy",
    returnDate: "Back Jul 31, 2026",
    initials: "AD",
  },
];
