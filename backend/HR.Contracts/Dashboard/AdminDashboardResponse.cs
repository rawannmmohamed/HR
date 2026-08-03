namespace HR.Contracts.Dashboard;

public sealed record AdminDashboardResponse(
    AdminDashboardSummaryResponse Summary,
    IReadOnlyList<AdminLeaveRequestResponse> LeaveRequests,
    IReadOnlyList<AttendanceSummaryResponse> AttendanceSummary,
    IReadOnlyList<AdminEmployeeRecordResponse> Employees,
    IReadOnlyList<ContractAlertResponse> ContractAlerts);

public sealed record AdminDashboardSummaryResponse(
    int ActiveEmployees,
    int LeavePending,
    int ContractsExpiring);

public sealed record AdminLeaveRequestResponse(
    string Id,
    string EmployeeName,
    string LeaveType,
    DateOnly StartDate,
    DateOnly EndDate,
    decimal RequestedDays,
    decimal BalanceAfterApproval,
    string Status);

public sealed record AttendanceSummaryResponse(
    string Label,
    int Value,
    string Note,
    string Tone);

public sealed record AdminEmployeeRecordResponse(
    string Id,
    string Name,
    string Role,
    string Department,
    string Location,
    string Manager,
    string Status,
    decimal LeaveUsed,
    decimal LeaveTotal,
    DateOnly ContractEnds);

public sealed record ContractAlertResponse(
    string EmployeeId,
    string EmployeeName,
    string Role,
    DateOnly ContractEnds,
    string Status);
