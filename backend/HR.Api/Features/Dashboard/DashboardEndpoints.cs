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
        .WithName("GetAdminDashboard");

        group.MapGet("/employees/dashboard", async (
            IDashboardQueryService dashboardQueryService,
            string employeeNumber,
            CancellationToken cancellationToken) =>
        {
            var dashboard = await dashboardQueryService.GetEmployeeDashboardAsync(employeeNumber, cancellationToken);
            return dashboard is null ? Results.NotFound() : Results.Ok(dashboard);
        })
        .WithName("GetEmployeeDashboard");

        return app;
    }
}
