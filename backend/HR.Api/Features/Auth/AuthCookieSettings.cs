namespace HR.Api.Features.Auth;

public sealed class AuthCookieSettings
{
    public const string SectionName = "AuthCookies";

    public bool RequireSecureRefreshCookie { get; init; } = true;
}
