export type EmployeeDashboardResponse = {
  employeeId: string;
  name: string;
  summary: {
    daysAvailable: number;
    usedThisYear: number;
    pendingRequests: number;
    teammatesOffToday: number;
  };
  leaveBalances: EmployeeLeaveBalanceResponse[];
  pendingRequestsTotal: number;
  peopleOffToday: PersonOffTodayResponse[];
  upcomingHolidays: UpcomingHolidayResponse[];
};

export type EmployeeLeaveBalanceResponse = {
  leaveType: string;
  remainingDays: number;
  usedDays: number;
  entitledDays: number;
  pendingDays: number;
  policyCap?: string | null;
};

export type PersonOffTodayResponse = {
  employeeId: string;
  name: string;
  initials: string;
  returnDateLabel: string;
};

export type UpcomingHolidayResponse = {
  name: string;
  date: string;
};
