using HR.Contracts.Auth;

namespace HR.Application.Auth;

public sealed record AuthSession(
    AuthResponse Response,
    string RefreshToken,
    DateTime RefreshTokenExpiresAtUtc);
