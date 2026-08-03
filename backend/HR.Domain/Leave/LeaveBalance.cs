using HR.Domain.Common;
using HR.Domain.Employees;

namespace HR.Domain.Leave;

public sealed class LeaveBalance : AuditableEntity
{
    public Guid EmployeeId { get; set; }
    public Employee? Employee { get; set; }

    public Guid LeaveTypeId { get; set; }
    public LeaveType? LeaveType { get; set; }

    public int Year { get; set; }
    public decimal EntitledDays { get; set; }
    public decimal UsedDays { get; set; }
    public decimal PendingDays { get; set; }
    public decimal RemainingDays => EntitledDays - UsedDays - PendingDays;
}
