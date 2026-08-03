using HR.Application.Auth;
using HR.Contracts.Auth;
using HR.Domain.Auth;
using HR.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HR.Infrastructure.Auth;

internal sealed class AuthService(
    HrDbContext dbContext,
    PasswordHasher<AppUser> passwordHasher,
    ITokenService tokenService) : IAuthService
{
    public async Task<AuthResponse?> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var normalizedEmail = NormalizeEmail(request.Email);
        var user = await GetUserByEmailAsync(normalizedEmail, cancellationToken);

        if (user is null || !user.IsActive)
        {
            return null;
        }

        var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (result is PasswordVerificationResult.Failed)
        {
            return null;
        }

        return await IssueAuthResponseAsync(user, cancellationToken);
    }

    public async Task<AuthResponse?> RefreshAsync(RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var tokenHash = tokenService.HashRefreshToken(request.RefreshToken);
        var refreshToken = await dbContext.RefreshTokens
            .Include(token => token.User)
            .ThenInclude(user => user!.Employee)
            .FirstOrDefaultAsync(token => token.TokenHash == tokenHash, cancellationToken);

        if (refreshToken?.User is null || !refreshToken.IsActive || !refreshToken.User.IsActive)
        {
            return null;
        }

        var newRefreshToken = tokenService.CreateRefreshToken();
        var newRefreshTokenHash = tokenService.HashRefreshToken(newRefreshToken);
        var newRefreshTokenExpiresAtUtc = tokenService.GetRefreshTokenExpiresAtUtc();

        refreshToken.RevokedAtUtc = DateTime.UtcNow;
        refreshToken.ReplacedByTokenHash = newRefreshTokenHash;

        dbContext.RefreshTokens.Add(new RefreshToken
        {
            UserId = refreshToken.User.Id,
            TokenHash = newRefreshTokenHash,
            ExpiresAtUtc = newRefreshTokenExpiresAtUtc
        });

        await dbContext.SaveChangesAsync(cancellationToken);

        return CreateAuthResponse(refreshToken.User, newRefreshToken, newRefreshTokenExpiresAtUtc);
    }

    public async Task LogoutAsync(RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var tokenHash = tokenService.HashRefreshToken(request.RefreshToken);
        var refreshToken = await dbContext.RefreshTokens
            .FirstOrDefaultAsync(token => token.TokenHash == tokenHash, cancellationToken);

        if (refreshToken is not null && refreshToken.RevokedAtUtc is null)
        {
            refreshToken.RevokedAtUtc = DateTime.UtcNow;
            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task<CurrentUserResponse?> GetCurrentUserAsync(Guid userId, CancellationToken cancellationToken)
    {
        var user = await dbContext.AppUsers
            .Include(appUser => appUser.Employee)
            .FirstOrDefaultAsync(appUser => appUser.Id == userId && appUser.IsActive, cancellationToken);

        return user is null ? null : MapCurrentUser(user);
    }

    private async Task<AuthResponse> IssueAuthResponseAsync(AppUser user, CancellationToken cancellationToken)
    {
        var refreshToken = tokenService.CreateRefreshToken();
        var refreshTokenHash = tokenService.HashRefreshToken(refreshToken);
        var refreshTokenExpiresAtUtc = tokenService.GetRefreshTokenExpiresAtUtc();

        dbContext.RefreshTokens.Add(new RefreshToken
        {
            UserId = user.Id,
            TokenHash = refreshTokenHash,
            ExpiresAtUtc = refreshTokenExpiresAtUtc
        });

        await dbContext.SaveChangesAsync(cancellationToken);

        return CreateAuthResponse(user, refreshToken, refreshTokenExpiresAtUtc);
    }

    private AuthResponse CreateAuthResponse(
        AppUser user,
        string refreshToken,
        DateTime refreshTokenExpiresAtUtc)
    {
        var accessToken = tokenService.CreateAccessToken(
            user,
            user.Employee?.EmployeeNumber,
            out var accessTokenExpiresAtUtc);

        return new AuthResponse(
            accessToken,
            refreshToken,
            accessTokenExpiresAtUtc,
            refreshTokenExpiresAtUtc,
            MapCurrentUser(user));
    }

    private static CurrentUserResponse MapCurrentUser(AppUser user)
    {
        var role = user.Role is AppRole.HrAdmin ? AuthRoleNames.HrAdmin : AuthRoleNames.Employee;
        var displayName = user.Employee is null
            ? null
            : $"{user.Employee.FirstName} {user.Employee.LastName}";

        return new CurrentUserResponse(
            user.Id,
            user.Email,
            role,
            user.EmployeeId,
            user.Employee?.EmployeeNumber,
            displayName);
    }

    private Task<AppUser?> GetUserByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
    {
        return dbContext.AppUsers
            .Include(user => user.Employee)
            .FirstOrDefaultAsync(user => user.Email == normalizedEmail, cancellationToken);
    }

    private static string NormalizeEmail(string email)
    {
        return email.Trim().ToLowerInvariant();
    }
}
