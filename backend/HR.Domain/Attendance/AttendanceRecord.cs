using HR.Domain.Common;
using HR.Domain.Employees;

namespace HR.Domain.Attendance;

public sealed class AttendanceRecord : AuditableEntity
{
    public Guid EmployeeId { get; set; }
    public Employee? Employee { get; set; }

    public DateOnly WorkDate { get; set; }
    public TimeOnly? CheckInTime { get; set; }
    public TimeOnly? CheckOutTime { get; set; }
    public AttendanceStatus Status { get; set; } = AttendanceStatus.Present;
    public string? Notes { get; set; }
}
