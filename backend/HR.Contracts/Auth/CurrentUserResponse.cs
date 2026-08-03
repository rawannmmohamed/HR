namespace HR.Contracts.Auth;

public sealed record CurrentUserResponse(
    Guid Id,
    string Email,
    string Role,
    Guid? EmployeeId,
    string? EmployeeNumber,
    string? DisplayName);
