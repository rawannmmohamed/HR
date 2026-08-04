using System.ComponentModel.DataAnnotations;
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
            var validationErrors = ValidateLoginRequest(request);
            if (validationErrors.Count > 0)
            {
                return Results.ValidationProblem(
                    validationErrors,
                    title: "Validation failed",
                    detail: "Please review the sign in information and try again.",
                    statusCode: StatusCodes.Status400BadRequest);
            }

            var session = await authService.LoginAsync(request, cancellationToken);
            if (session is null)
            {
                return Results.Problem(
                    title: "Sign in failed",
                    detail: "Email or password is incorrect.",
                    statusCode: StatusCodes.Status401Unauthorized);
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
                return Results.Problem(
                    title: "Session expired",
                    detail: "Please sign in again to continue.",
                    statusCode: StatusCodes.Status401Unauthorized);
            }

            var session = await authService.RefreshAsync(refreshToken, cancellationToken);
            if (session is null)
            {
                ClearRefreshTokenCookie(httpContext, authCookieSettings.Value);
                return Results.Problem(
                    title: "Session expired",
                    detail: "Please sign in again to continue.",
                    statusCode: StatusCodes.Status401Unauthorized);
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
                return Results.Problem(
                    title: "Session expired",
                    detail: "Please sign in again to continue.",
                    statusCode: StatusCodes.Status401Unauthorized);
            }

            var response = await authService.GetCurrentUserAsync(userId.Value, cancellationToken);
            return response is null
                ? Results.Problem(
                    title: "Session expired",
                    detail: "Please sign in again to continue.",
                    statusCode: StatusCodes.Status401Unauthorized)
                : Results.Ok(response);
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

    private static Dictionary<string, string[]> ValidateLoginRequest(LoginRequest request)
    {
        var validationResults = new List<ValidationResult>();
        var context = new ValidationContext(request);

        if (Validator.TryValidateObject(request, context, validationResults, validateAllProperties: true))
        {
            return [];
        }

        return validationResults
            .SelectMany(result => result.MemberNames.DefaultIfEmpty(string.Empty), (result, memberName) => new
            {
                MemberName = memberName,
                ErrorMessage = result.ErrorMessage ?? "The field is invalid."
            })
            .GroupBy(error => error.MemberName)
            .ToDictionary(
                group => group.Key,
                group => group.Select(error => error.ErrorMessage).ToArray());
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
