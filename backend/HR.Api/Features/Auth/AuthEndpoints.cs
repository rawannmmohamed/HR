using System.Security.Claims;
using HR.Application.Auth;
using HR.Contracts.Auth;

namespace HR.Api.Features.Auth;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth").WithTags("Auth");

        group.MapPost("/login", async (
            LoginRequest request,
            IAuthService authService,
            CancellationToken cancellationToken) =>
        {
            var response = await authService.LoginAsync(request, cancellationToken);
            return response is null ? Results.Unauthorized() : Results.Ok(response);
        })
        .AllowAnonymous()
        .WithName("Login");

        group.MapPost("/refresh", async (
            RefreshTokenRequest request,
            IAuthService authService,
            CancellationToken cancellationToken) =>
        {
            var response = await authService.RefreshAsync(request, cancellationToken);
            return response is null ? Results.Unauthorized() : Results.Ok(response);
        })
        .AllowAnonymous()
        .WithName("RefreshToken");

        group.MapPost("/logout", async (
            RefreshTokenRequest request,
            IAuthService authService,
            CancellationToken cancellationToken) =>
        {
            await authService.LogoutAsync(request, cancellationToken);
            return Results.NoContent();
        })
        .RequireAuthorization()
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
}
