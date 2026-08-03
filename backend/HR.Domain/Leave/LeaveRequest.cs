using HR.Domain.Common;
using HR.Domain.Employees;

namespace HR.Domain.Leave;

public sealed class LeaveRequest : AuditableEntity
{
    public Guid EmployeeId { get; set; }
    public Employee? Employee { get; set; }

    public Guid LeaveTypeId { get; set; }
    public LeaveType? LeaveType { get; set; }

    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public decimal RequestedDays { get; set; }
    public string? Reason { get; set; }
    public LeaveRequestStatus Status { get; set; } = LeaveRequestStatus.Pending;
    public DateTime RequestedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? ReviewedAtUtc { get; set; }
    public Guid? ReviewedByEmployeeId { get; set; }
    public Employee? ReviewedByEmployee { get; set; }
    public string? ReviewNotes { get; set; }
}
