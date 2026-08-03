using HR.Domain.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace HR.Infrastructure.Persistence.Seed;

public static class AuthSeedData
{
    public static async Task ApplyAsync(IServiceProvider serviceProvider, CancellationToken cancellationToken = default)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<HrDbContext>();
        var passwordHasher = scope.ServiceProvider.GetRequiredService<PasswordHasher<AppUser>>();

        await SeedUserAsync(
            dbContext,
            passwordHasher,
            id: SeedIds.AdminUserId,
            email: "admin@hrsystem.local",
            password: "Admin@12345",
            role: AppRole.HrAdmin,
            employeeId: SeedIds.NourEmployeeId,
            cancellationToken);

        await SeedUserAsync(
            dbContext,
            passwordHasher,
            id: SeedIds.EmployeeUserId,
            email: "employee@hrsystem.local",
            password: "Employee@12345",
            role: AppRole.Employee,
            employeeId: SeedIds.RawanEmployeeId,
            cancellationToken);
    }

    private static async Task SeedUserAsync(
        HrDbContext dbContext,
        PasswordHasher<AppUser> passwordHasher,
        Guid id,
        string email,
        string password,
        AppRole role,
        Guid employeeId,
        CancellationToken cancellationToken)
    {
        if (await dbContext.AppUsers.AnyAsync(user => user.Email == email, cancellationToken))
        {
            return;
        }

        var user = new AppUser
        {
            Id = id,
            Email = email,
            Role = role,
            EmployeeId = employeeId,
            CreatedAtUtc = new DateTime(2026, 7, 28, 9, 0, 0, DateTimeKind.Utc)
        };

        user.PasswordHash = passwordHasher.HashPassword(user, password);
        dbContext.AppUsers.Add(user);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
