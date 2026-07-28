import type { ElementType } from "react";

export type EmployeeDashboardNavItem = {
  label: string;
  icon: ElementType;
  badge?: string;
};

export type EmployeeSummaryCard = {
  label: string;
  value: string;
  icon: ElementType;
  tone: "violet" | "amber" | "emerald";
};

export type LeaveBalance = {
  label: string;
  value: string;
  details: string;
  usage: string;
  policyCap?: string;
  accentClassName: string;
  progress: number;
};

export type PersonOffToday = {
  name: string;
  returnDate: string;
  initials: string;
};

export type EmployeeSummaryCardsProps = {
  cards: EmployeeSummaryCard[];
};

export type LeaveBalanceGridProps = {
  balances: LeaveBalance[];
};

export type PendingRequestsPanelProps = {
  total: number;
};

export type WhosOffTodayPanelProps = {
  people: PersonOffToday[];
};
