using HR.Domain.Common;
using HR.Domain.Employees;

namespace HR.Domain.Auth;

public sealed class AppUser : AuditableEntity
{
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public AppRole Role { get; set; }
    public bool IsActive { get; set; } = true;
    public Guid? EmployeeId { get; set; }
    public Employee? Employee { get; set; }
    public ICollection<RefreshToken> RefreshTokens { get; set; } = [];
}
