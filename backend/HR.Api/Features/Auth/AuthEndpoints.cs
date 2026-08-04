using System.Security.Claims;
using HR.Application.Auth;
using HR.Contracts.Auth;
using Microsoft.Extensions.Options;

namespace HR.Api.Features.Auth;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth").WithTags("Auth");

        group.MapPost("/login", async (
            LoginRequest request,
            IAuthService authService,
            HttpContext httpContext,
            IOptions<AuthCookieSettings> authCookieSettings,
            CancellationToken cancellationToken) =>
        {
            var session = await authService.LoginAsync(request, cancellationToken);
            if (session is null)
            {
                return Results.Unauthorized();
            }

            WriteRefreshTokenCookie(httpContext, session.RefreshToken, session.RefreshTokenExpiresAtUtc, authCookieSettings.Value);
            return Results.Ok(session.Response);
        })
        .AllowAnonymous()
        .WithName("Login");

        group.MapPost("/refresh", async (
            IAuthService authService,
            HttpContext httpContext,
            IOptions<AuthCookieSettings> authCookieSettings,
            CancellationToken cancellationToken) =>
        {
            var refreshToken = ReadRefreshTokenCookie(httpContext);
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return Results.Unauthorized();
            }

            var session = await authService.RefreshAsync(refreshToken, cancellationToken);
            if (session is null)
            {
                ClearRefreshTokenCookie(httpContext, authCookieSettings.Value);
                return Results.Unauthorized();
            }

            WriteRefreshTokenCookie(httpContext, session.RefreshToken, session.RefreshTokenExpiresAtUtc, authCookieSettings.Value);
            return Results.Ok(session.Response);
        })
        .AllowAnonymous()
        .WithName("RefreshToken");

        group.MapPost("/logout", async (
            IAuthService authService,
            HttpContext httpContext,
            IOptions<AuthCookieSettings> authCookieSettings,
            CancellationToken cancellationToken) =>
        {
            var refreshToken = ReadRefreshTokenCookie(httpContext);
            if (!string.IsNullOrWhiteSpace(refreshToken))
            {
                await authService.LogoutAsync(refreshToken, cancellationToken);
            }

            ClearRefreshTokenCookie(httpContext, authCookieSettings.Value);
            return Results.NoContent();
        })
        .AllowAnonymous()
        .WithName("Logout");

        group.MapGet("/me", async (
            ClaimsPrincipal user,
            IAuthService authService,
            CancellationToken cancellationToken) =>
        {
            var userId = GetUserId(user);
            if (userId is null)
            {
                return Results.Unauthorized();
            }

            var response = await authService.GetCurrentUserAsync(userId.Value, cancellationToken);
            return response is null ? Results.Unauthorized() : Results.Ok(response);
        })
        .RequireAuthorization()
        .WithName("GetCurrentUser");

        return app;
    }

    private static Guid? GetUserId(ClaimsPrincipal user)
    {
        var value = user.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(value, out var userId) ? userId : null;
    }

    private static string? ReadRefreshTokenCookie(HttpContext httpContext)
    {
        return httpContext.Request.Cookies.TryGetValue(
            AuthCookieOptions.RefreshTokenCookieName,
            out var refreshToken)
            ? refreshToken
            : null;
    }

    private static void WriteRefreshTokenCookie(
        HttpContext httpContext,
        string refreshToken,
        DateTime expiresAtUtc,
        AuthCookieSettings settings)
    {
        httpContext.Response.Cookies.Append(
            AuthCookieOptions.RefreshTokenCookieName,
            refreshToken,
            AuthCookieOptions.CreateRefreshTokenCookie(expiresAtUtc, settings));
    }

    private static void ClearRefreshTokenCookie(HttpContext httpContext, AuthCookieSettings settings)
    {
        httpContext.Response.Cookies.Append(
            AuthCookieOptions.RefreshTokenCookieName,
            string.Empty,
            AuthCookieOptions.CreateExpiredRefreshTokenCookie(settings));
    }
}
