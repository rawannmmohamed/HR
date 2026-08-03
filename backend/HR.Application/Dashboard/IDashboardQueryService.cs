using HR.Contracts.Dashboard;

namespace HR.Application.Dashboard;

public interface IDashboardQueryService
{
    Task<AdminDashboardResponse> GetAdminDashboardAsync(CancellationToken cancellationToken = default);

    Task<EmployeeDashboardResponse?> GetEmployeeDashboardAsync(
        string employeeNumber,
        CancellationToken cancellationToken = default);
}
