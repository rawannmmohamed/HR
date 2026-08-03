namespace HR.Contracts.Auth;

public sealed record AuthResponse(
    string AccessToken,
    DateTime AccessTokenExpiresAtUtc,
    CurrentUserResponse User);
