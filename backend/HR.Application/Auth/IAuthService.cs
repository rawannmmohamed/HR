using HR.Contracts.Auth;

namespace HR.Application.Auth;

public interface IAuthService
{
    Task<AuthSession?> LoginAsync(LoginRequest request, CancellationToken cancellationToken);
    Task<AuthSession?> RefreshAsync(string refreshToken, CancellationToken cancellationToken);
    Task LogoutAsync(string refreshToken, CancellationToken cancellationToken);
    Task<CurrentUserResponse?> GetCurrentUserAsync(Guid userId, CancellationToken cancellationToken);
}
