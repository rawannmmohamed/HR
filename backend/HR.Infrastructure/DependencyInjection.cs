using HR.Application.Auth;
using HR.Application.Dashboard;
using HR.Domain.Auth;
using HR.Infrastructure.Auth;
using HR.Infrastructure.Dashboard;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using HR.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;

namespace HR.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("HrDatabase")
            ?? throw new InvalidOperationException("Connection string 'HrDatabase' was not found.");

        services.AddDbContext<HrDbContext>(options => options.UseSqlServer(connectionString));
        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
        services.AddScoped<PasswordHasher<AppUser>>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IDashboardQueryService, DashboardQueryService>();

        return services;
    }
}
