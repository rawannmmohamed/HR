using HR.Domain.Common;

namespace HR.Domain.Leave;

public sealed class LeaveType : AuditableEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal AnnualAllowanceDays { get; set; }
    public bool RequiresApproval { get; set; } = true;
    public bool IsPaid { get; set; } = true;

    public ICollection<LeaveBalance> LeaveBalances { get; set; } = [];
    public ICollection<LeaveRequest> LeaveRequests { get; set; } = [];
}
