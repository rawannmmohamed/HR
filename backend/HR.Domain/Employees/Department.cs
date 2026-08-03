using HR.Domain.Common;

namespace HR.Domain.Employees;

public sealed class Department : AuditableEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public ICollection<Employee> Employees { get; set; } = [];
}
