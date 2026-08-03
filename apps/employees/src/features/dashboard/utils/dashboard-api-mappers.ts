import { employeeSummaryCards } from "../constants";
import type { EmployeeLeaveBalanceResponse, EmployeeDashboardResponse, PersonOffTodayResponse } from "../types/dashboard-api.types";
import type { EmployeeSummaryCard, LeaveBalance, PersonOffToday } from "../types";

type EmployeeDashboardSummary = EmployeeDashboardResponse["summary"];

export function mapSummaryCards(summary: EmployeeDashboardSummary): EmployeeSummaryCard[] {
  return employeeSummaryCards.map((card) => {
    const valueByLabel: Record<string, string> = {
      "Days available": formatNumber(summary.daysAvailable),
      "Used this year": formatNumber(summary.usedThisYear),
      "Pending requests": String(summary.pendingRequests),
      "Teammates off today": String(summary.teammatesOffToday),
    };

    return {
      ...card,
      value: valueByLabel[card.label] ?? card.value,
    };
  });
}

export function mapLeaveBalance(balance: EmployeeLeaveBalanceResponse): LeaveBalance {
  const usedOrPendingDays = balance.usedDays + balance.pendingDays;
  const progress = balance.entitledDays > 0 ? Math.min((usedOrPendingDays / balance.entitledDays) * 100, 100) : 0;

  return {
    label: balance.leaveType,
    value: formatNumber(balance.remainingDays),
    details: `${formatNumber(balance.remainingDays)} days left`,
    usage: `${formatNumber(usedOrPendingDays)}/${formatNumber(balance.entitledDays)}`,
    policyCap: balance.policyCap ?? undefined,
    accentClassName: getLeaveAccentClassName(balance.leaveType),
    progress,
  };
}

export function mapPersonOffToday(person: PersonOffTodayResponse): PersonOffToday {
  return {
    name: person.name,
    initials: person.initials,
    returnDate: capitalizeFirstLetter(person.returnDateLabel),
  };
}

function getLeaveAccentClassName(leaveType: string) {
  const normalizedLeaveType = leaveType.toLowerCase();

  if (normalizedLeaveType.includes("annual")) return "bg-blue-400";
  if (normalizedLeaveType.includes("sick")) return "bg-rose-400";
  if (normalizedLeaveType.includes("casual")) return "bg-sky-400";
  if (normalizedLeaveType.includes("marriage")) return "bg-pink-500";

  return "bg-slate-400";
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
