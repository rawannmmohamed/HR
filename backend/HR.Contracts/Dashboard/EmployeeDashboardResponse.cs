namespace HR.Contracts.Dashboard;

public sealed record EmployeeDashboardResponse(
    string EmployeeId,
    string Name,
    EmployeeDashboardSummaryResponse Summary,
    IReadOnlyList<EmployeeLeaveBalanceResponse> LeaveBalances,
    int PendingRequestsTotal,
    IReadOnlyList<PersonOffTodayResponse> PeopleOffToday,
    IReadOnlyList<UpcomingHolidayResponse> UpcomingHolidays);

public sealed record EmployeeDashboardSummaryResponse(
    decimal DaysAvailable,
    decimal UsedThisYear,
    int PendingRequests,
    int TeammatesOffToday);

public sealed record EmployeeLeaveBalanceResponse(
    string LeaveType,
    decimal RemainingDays,
    decimal UsedDays,
    decimal EntitledDays,
    decimal PendingDays,
    string? PolicyCap);

public sealed record PersonOffTodayResponse(
    string EmployeeId,
    string Name,
    string Initials,
    string ReturnDateLabel);

public sealed record UpcomingHolidayResponse(
    string Name,
    DateOnly Date);
