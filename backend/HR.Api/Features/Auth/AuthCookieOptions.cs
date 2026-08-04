namespace HR.Api.Features.Auth;

internal static class AuthCookieOptions
{
    internal const string RefreshTokenCookieName = "hr_refresh_token";

    internal static CookieOptions CreateRefreshTokenCookie(
        DateTime expiresAtUtc,
        AuthCookieSettings settings)
    {
        return new CookieOptions
        {
            HttpOnly = true,
            Secure = settings.RequireSecureRefreshCookie,
            SameSite = SameSiteMode.Lax,
            Expires = expiresAtUtc,
            Path = "/api/auth"
        };
    }

    internal static CookieOptions CreateExpiredRefreshTokenCookie(AuthCookieSettings settings)
    {
        return new CookieOptions
        {
            HttpOnly = true,
            Secure = settings.RequireSecureRefreshCookie,
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UnixEpoch,
            Path = "/api/auth"
        };
    }
}
