using System.ComponentModel.DataAnnotations;

namespace HR.Contracts.Auth;

public sealed record RefreshTokenRequest([property: Required] string RefreshToken);
