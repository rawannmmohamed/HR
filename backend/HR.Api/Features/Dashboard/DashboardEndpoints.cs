using System.Security.Claims;
using HR.Application.Auth;
using HR.Application.Dashboard;

namespace HR.Api.Features.Dashboard;

public static class DashboardEndpoints
{
    public static IEndpointRouteBuilder MapDashboardEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api");

        group.MapGet("/admin/dashboard", async (
            IDashboardQueryService dashboardQueryService,
            CancellationToken cancellationToken) =>
        {
            var dashboard = await dashboardQueryService.GetAdminDashboardAsync(cancellationToken);
            return Results.Ok(dashboard);
        })
        .RequireAuthorization(AuthPolicies.HrAdmin)
        .WithName("GetAdminDashboard");

        group.MapGet("/employees/dashboard", async (
            ClaimsPrincipal user,
            IDashboardQueryService dashboardQueryService,
            CancellationToken cancellationToken) =>
        {
            var employeeNumber = user.FindFirstValue("employee_number");
            if (string.IsNullOrWhiteSpace(employeeNumber))
            {
                return Results.Unauthorized();
            }

            var dashboard = await dashboardQueryService.GetEmployeeDashboardAsync(employeeNumber, cancellationToken);
            return dashboard is null ? Results.NotFound() : Results.Ok(dashboard);
        })
        .RequireAuthorization(AuthPolicies.Employee)
        .WithName("GetEmployeeDashboard");

        return app;
    }
}
