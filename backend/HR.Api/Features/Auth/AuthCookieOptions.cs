namespace HR.Api.Features.Auth;

internal static class AuthCookieOptions
{
    internal const string RefreshTokenCookieName = "hr_refresh_token";

    internal static CookieOptions CreateRefreshTokenCookie(
        DateTime expiresAtUtc,
        HttpRequest request)
    {
        return new CookieOptions
        {
            HttpOnly = true,
            Secure = request.IsHttps,
            SameSite = SameSiteMode.Lax,
            Expires = expiresAtUtc,
            Path = "/api/auth"
        };
    }

    internal static CookieOptions CreateExpiredRefreshTokenCookie(HttpRequest request)
    {
        return new CookieOptions
        {
            HttpOnly = true,
            Secure = request.IsHttps,
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UnixEpoch,
            Path = "/api/auth"
        };
    }
}
