import type { WorkspaceSearchItem } from "@hr/shared";
import type { EmployeeSummaryCard, LeaveBalance, PersonOffToday } from "../types";

type BuildEmployeeDashboardSearchItemsParams = {
  leaveBalances: LeaveBalance[];
  peopleOffToday: PersonOffToday[];
  summaryCards: EmployeeSummaryCard[];
};

export function buildEmployeeDashboardSearchItems({
  leaveBalances,
  peopleOffToday,
  summaryCards,
}: BuildEmployeeDashboardSearchItemsParams): WorkspaceSearchItem[] {
  return [
    ...summaryCards.map((card) => ({
      category: "Summary",
      label: card.label,
      description: `${card.value} shown on your dashboard`,
      keywords: [card.tone],
    })),
    ...leaveBalances.map((balance) => ({
      category: "Balances",
      label: balance.label,
      description: `${balance.details}. Used ${balance.usage}${balance.policyCap ? `, ${balance.policyCap.toLowerCase()}` : ""}`,
      keywords: [balance.value, balance.usage, balance.policyCap ?? ""],
    })),
    {
      category: "Requests",
      label: "Pending requests",
      description: "No pending requests - you're all caught up.",
      keywords: ["pto", "leave", "approval"],
    },
    {
      category: "Time off",
      label: "Your next time off",
      description: "No time off planned.",
      keywords: ["plan", "pto", "vacation"],
    },
    {
      category: "Holidays",
      label: "Upcoming holidays",
      description: "No holidays coming up.",
      keywords: ["calendar", "holiday"],
    },
    ...peopleOffToday.map((person) => ({
      category: "Who's off today",
      label: person.name,
      description: person.returnDate,
      keywords: [person.initials],
    })),
  ];
}
