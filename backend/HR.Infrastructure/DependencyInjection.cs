using HR.Application.Dashboard;
using HR.Infrastructure.Dashboard;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using HR.Infrastructure.Persistence;

namespace HR.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("HrDatabase")
            ?? throw new InvalidOperationException("Connection string 'HrDatabase' was not found.");

        services.AddDbContext<HrDbContext>(options => options.UseSqlServer(connectionString));
        services.AddScoped<IDashboardQueryService, DashboardQueryService>();

        return services;
    }
}
