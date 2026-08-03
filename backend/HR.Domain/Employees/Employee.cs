using HR.Domain.Common;
using HR.Domain.Attendance;
using HR.Domain.Contracts;
using HR.Domain.Leave;

namespace HR.Domain.Employees;

public sealed class Employee : AuditableEntity
{
    public string EmployeeNumber { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateOnly HireDate { get; set; }
    public EmployeeStatus Status { get; set; } = EmployeeStatus.Active;

    public Guid DepartmentId { get; set; }
    public Department? Department { get; set; }

    public Guid? ManagerId { get; set; }
    public Employee? Manager { get; set; }
    public ICollection<Employee> DirectReports { get; set; } = [];

    public ICollection<AttendanceRecord> AttendanceRecords { get; set; } = [];
    public ICollection<Contract> Contracts { get; set; } = [];
    public ICollection<LeaveBalance> LeaveBalances { get; set; } = [];
    public ICollection<LeaveRequest> LeaveRequests { get; set; } = [];
}
