using HR.Domain.Auth;

namespace HR.Infrastructure.Auth;

internal interface ITokenService
{
    string CreateAccessToken(AppUser user, string? employeeNumber, out DateTime expiresAtUtc);
    string CreateRefreshToken();
    string HashRefreshToken(string refreshToken);
    DateTime GetRefreshTokenExpiresAtUtc();
}
