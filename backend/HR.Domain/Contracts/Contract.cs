using HR.Domain.Common;
using HR.Domain.Employees;

namespace HR.Domain.Contracts;

public sealed class Contract : AuditableEntity
{
    public Guid EmployeeId { get; set; }
    public Employee? Employee { get; set; }

    public ContractType Type { get; set; } = ContractType.FullTime;
    public ContractStatus Status { get; set; } = ContractStatus.Active;
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public DateTime? ReviewedAtUtc { get; set; }
    public string? Notes { get; set; }
}
