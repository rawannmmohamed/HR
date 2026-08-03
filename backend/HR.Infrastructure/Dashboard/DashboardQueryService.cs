using HR.Application.Dashboard;
using HR.Contracts.Dashboard;
using HR.Domain.Attendance;
using HR.Domain.Contracts;
using HR.Domain.Employees;
using HR.Domain.Leave;
using HR.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace HR.Infrastructure.Dashboard;

internal sealed class DashboardQueryService(HrDbContext dbContext) : IDashboardQueryService
{
    private static readonly DateOnly DashboardDate = new(2026, 7, 28);
    private static readonly DateOnly ContractAlertCutoff = DashboardDate.AddDays(60);

    public async Task<AdminDashboardResponse> GetAdminDashboardAsync(CancellationToken cancellationToken = default)
    {
        var employees = await dbContext.Employees
            .AsNoTracking()
            .Include(employee => employee.Department)
            .Include(employee => employee.Manager)
            .Include(employee => employee.LeaveBalances)
            .Include(employee => employee.Contracts)
            .OrderBy(employee => employee.EmployeeNumber)
            .ToListAsync(cancellationToken);

        var pendingLeaveRequests = await dbContext.LeaveRequests
            .AsNoTracking()
            .Include(request => request.Employee)
            .ThenInclude(employee => employee!.LeaveBalances)
            .Include(request => request.LeaveType)
            .Where(request => request.Status == LeaveRequestStatus.Pending)
            .OrderBy(request => request.StartDate)
            .ToListAsync(cancellationToken);

        var attendanceRecords = await dbContext.AttendanceRecords
            .AsNoTracking()
            .Where(record => record.WorkDate == DashboardDate)
            .ToListAsync(cancellationToken);

        var contractAlerts = employees
            .SelectMany(employee => employee.Contracts.Select(contract => new { Employee = employee, Contract = contract }))
            .Where(item => item.Contract.Status == ContractStatus.ReviewRequired || item.Contract.EndDate <= ContractAlertCutoff)
            .OrderBy(item => item.Contract.EndDate)
            .Select(item => new ContractAlertResponse(
                item.Employee.EmployeeNumber,
                FormatEmployeeName(item.Employee),
                item.Employee.JobTitle,
                item.Contract.EndDate,
                FormatContractStatus(item.Contract.Status)))
            .ToList();

        return new AdminDashboardResponse(
            new AdminDashboardSummaryResponse(
                ActiveEmployees: employees.Count(employee => employee.Status is EmployeeStatus.Active or EmployeeStatus.Probation or EmployeeStatus.ContractReview),
                LeavePending: pendingLeaveRequests.Count,
                ContractsExpiring: contractAlerts.Count),
            pendingLeaveRequests.Select(CreateAdminLeaveRequestResponse).ToList(),
            CreateAttendanceSummary(attendanceRecords),
            employees.Select(CreateAdminEmployeeRecordResponse).ToList(),
            contractAlerts);
    }

    public async Task<EmployeeDashboardResponse?> GetEmployeeDashboardAsync(
        string employeeNumber,
        CancellationToken cancellationToken = default)
    {
        var employee = await dbContext.Employees
            .AsNoTracking()
            .Include(currentEmployee => currentEmployee.LeaveBalances)
            .ThenInclude(balance => balance.LeaveType)
            .Include(currentEmployee => currentEmployee.LeaveRequests)
            .FirstOrDefaultAsync(currentEmployee => currentEmployee.EmployeeNumber == employeeNumber, cancellationToken);

        if (employee is null)
        {
            return null;
        }

        var absentEmployees = await dbContext.AttendanceRecords
            .AsNoTracking()
            .Include(record => record.Employee)
            .Where(record => record.WorkDate == DashboardDate && record.Status == AttendanceStatus.Absent && record.EmployeeId != employee.Id)
            .ToListAsync(cancellationToken);

        var balances = employee.LeaveBalances
            .OrderBy(balance => balance.LeaveType!.Name)
            .Select(balance => new EmployeeLeaveBalanceResponse(
                balance.LeaveType!.Name,
                balance.RemainingDays,
                balance.UsedDays,
                balance.EntitledDays,
                balance.PendingDays,
                GetPolicyCap(balance.LeaveType.Code)))
            .ToList();

        var pendingRequests = employee.LeaveRequests.Count(request => request.Status == LeaveRequestStatus.Pending);
        var usedThisYear = employee.LeaveBalances.Sum(balance => balance.UsedDays);
        var daysAvailable = employee.LeaveBalances.Sum(balance => balance.RemainingDays);

        return new EmployeeDashboardResponse(
            employee.EmployeeNumber,
            employee.FirstName,
            new EmployeeDashboardSummaryResponse(
                DaysAvailable: daysAvailable,
                UsedThisYear: usedThisYear,
                PendingRequests: pendingRequests,
                TeammatesOffToday: absentEmployees.Count),
            balances,
            pendingRequests,
            absentEmployees.Select(record => new PersonOffTodayResponse(
                record.Employee!.EmployeeNumber,
                FormatEmployeeName(record.Employee),
                GetInitials(record.Employee),
                GetReturnDateLabel(record.Notes))).ToList(),
            []);
    }

    private static AdminLeaveRequestResponse CreateAdminLeaveRequestResponse(LeaveRequest request)
    {
        var annualBalance = request.Employee!.LeaveBalances.FirstOrDefault(balance => balance.LeaveTypeId == request.LeaveTypeId);
        var balanceAfterApproval = annualBalance is null
            ? 0
            : annualBalance.EntitledDays - annualBalance.UsedDays - request.RequestedDays;

        return new AdminLeaveRequestResponse(
            request.Id.ToString(),
            FormatEmployeeName(request.Employee),
            request.LeaveType!.Name,
            request.StartDate,
            request.EndDate,
            request.RequestedDays,
            balanceAfterApproval,
            FormatLeaveStatus(request.Status));
    }

    private static AdminEmployeeRecordResponse CreateAdminEmployeeRecordResponse(Employee employee)
    {
        var annualBalance = employee.LeaveBalances.FirstOrDefault(balance => balance.Year == DashboardDate.Year);
        var currentContract = employee.Contracts.OrderByDescending(contract => contract.EndDate).FirstOrDefault();

        return new AdminEmployeeRecordResponse(
            employee.EmployeeNumber,
            FormatEmployeeName(employee),
            employee.JobTitle,
            employee.Department?.Name ?? string.Empty,
            employee.Location,
            employee.Manager is null ? "Unassigned" : FormatEmployeeName(employee.Manager),
            FormatEmployeeStatus(employee.Status),
            annualBalance?.UsedDays ?? 0,
            annualBalance?.EntitledDays ?? 0,
            currentContract?.EndDate ?? DateOnly.MinValue);
    }

    private static IReadOnlyList<AttendanceSummaryResponse> CreateAttendanceSummary(IReadOnlyCollection<AttendanceRecord> records)
    {
        var presentStatuses = new[] { AttendanceStatus.Present, AttendanceStatus.Late, AttendanceStatus.Remote, AttendanceStatus.MissingCheckout };

        return
        [
            new("Present today", records.Count(record => presentStatuses.Contains(record.Status)), "Active attendance records", "success"),
            new("Late check-ins", records.Count(record => record.Status == AttendanceStatus.Late), "Needs HR review", "warning"),
            new("Remote today", records.Count(record => record.Status == AttendanceStatus.Remote), "Working away from office", "default"),
            new("Missing checkout", records.Count(record => record.Status == AttendanceStatus.MissingCheckout), "Auto reminder queued", "danger")
        ];
    }

    private static string FormatEmployeeName(Employee employee) => $"{employee.FirstName} {employee.LastName}";

    private static string GetInitials(Employee employee) => $"{employee.FirstName[0]}{employee.LastName[0]}".ToUpperInvariant();

    private static string FormatEmployeeStatus(EmployeeStatus status) => status switch
    {
        EmployeeStatus.ContractReview => "Contract review",
        _ => status.ToString()
    };

    private static string FormatLeaveStatus(LeaveRequestStatus status) => status.ToString();

    private static string FormatContractStatus(ContractStatus status) => status switch
    {
        ContractStatus.ReviewRequired => "Review required",
        _ => status.ToString()
    };

    private static string? GetPolicyCap(string leaveTypeCode) =>
        leaveTypeCode is "CASUAL" or "COMPASSIONATE" or "EMERGENCY" or "MARRIAGE" ? "POLICY CAP" : null;

    private static string GetReturnDateLabel(string? notes)
    {
        const string defaultLabel = "Back soon";

        if (string.IsNullOrWhiteSpace(notes))
        {
            return defaultLabel;
        }

        var markerIndex = notes.IndexOf("back ", StringComparison.OrdinalIgnoreCase);
        return markerIndex < 0 ? defaultLabel : notes[markerIndex..];
    }
}
