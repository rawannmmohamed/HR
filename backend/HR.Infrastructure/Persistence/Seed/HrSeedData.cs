using HR.Domain.Attendance;
using HR.Domain.Contracts;
using HR.Domain.Employees;
using HR.Domain.Leave;
using Microsoft.EntityFrameworkCore;

namespace HR.Infrastructure.Persistence.Seed;

internal static class HrSeedData
{
    private static readonly DateTime SeedCreatedAtUtc = new(2026, 7, 28, 9, 0, 0, DateTimeKind.Utc);

    internal static void Apply(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Department>().HasData(Departments);
        modelBuilder.Entity<Employee>().HasData(Employees);
        modelBuilder.Entity<LeaveType>().HasData(LeaveTypes);
        modelBuilder.Entity<LeaveBalance>().HasData(LeaveBalances);
        modelBuilder.Entity<LeaveRequest>().HasData(LeaveRequests);
        modelBuilder.Entity<AttendanceRecord>().HasData(AttendanceRecords);
        modelBuilder.Entity<Contract>().HasData(Contracts);
    }

    private static readonly Department[] Departments =
    [
        new() { Id = SeedIds.HrDepartmentId, Code = "HR", Name = "HR", CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.ProductDepartmentId, Code = "PRODUCT", Name = "Product", CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.SalesDepartmentId, Code = "SALES", Name = "Sales", CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.DeliveryDepartmentId, Code = "DELIVERY", Name = "Delivery", CreatedAtUtc = SeedCreatedAtUtc }
    ];

    private static readonly Employee[] Employees =
    [
        new()
        {
            Id = SeedIds.RawanEmployeeId,
            EmployeeNumber = "EMP-1001",
            FirstName = "Rawan",
            LastName = "ElKhodary",
            Email = "rawan.elkhodary@hrsystem.local",
            JobTitle = "Product Designer",
            Location = "Cairo",
            HireDate = new DateOnly(2024, 1, 15),
            Status = EmployeeStatus.Active,
            DepartmentId = SeedIds.ProductDepartmentId,
            CreatedAtUtc = SeedCreatedAtUtc
        },
        new()
        {
            Id = SeedIds.RanaEmployeeId,
            EmployeeNumber = "EMP-1010",
            FirstName = "Rana",
            LastName = "Youssef",
            Email = "rana.youssef@hrsystem.local",
            JobTitle = "HR Manager",
            Location = "Cairo",
            HireDate = new DateOnly(2022, 3, 1),
            Status = EmployeeStatus.Active,
            DepartmentId = SeedIds.HrDepartmentId,
            CreatedAtUtc = SeedCreatedAtUtc
        },
        new()
        {
            Id = SeedIds.KarimEmployeeId,
            EmployeeNumber = "EMP-1020",
            FirstName = "Karim",
            LastName = "Adel",
            Email = "karim.adel@hrsystem.local",
            JobTitle = "Product Manager",
            Location = "Cairo",
            HireDate = new DateOnly(2021, 11, 7),
            Status = EmployeeStatus.Active,
            DepartmentId = SeedIds.ProductDepartmentId,
            CreatedAtUtc = SeedCreatedAtUtc
        },
        new()
        {
            Id = SeedIds.LinaEmployeeId,
            EmployeeNumber = "EMP-1030",
            FirstName = "Lina",
            LastName = "Maher",
            Email = "lina.maher@hrsystem.local",
            JobTitle = "Sales Manager",
            Location = "Dubai",
            HireDate = new DateOnly(2021, 6, 14),
            Status = EmployeeStatus.Active,
            DepartmentId = SeedIds.SalesDepartmentId,
            CreatedAtUtc = SeedCreatedAtUtc
        },
        new()
        {
            Id = SeedIds.NourEmployeeId,
            EmployeeNumber = "EMP-1042",
            FirstName = "Nour",
            LastName = "Hassan",
            Email = "nour.hassan@hrsystem.local",
            JobTitle = "People Operations Lead",
            Location = "Cairo",
            HireDate = new DateOnly(2023, 2, 5),
            Status = EmployeeStatus.Active,
            DepartmentId = SeedIds.HrDepartmentId,
            ManagerId = SeedIds.RanaEmployeeId,
            CreatedAtUtc = SeedCreatedAtUtc
        },
        new()
        {
            Id = SeedIds.OmarEmployeeId,
            EmployeeNumber = "EMP-1087",
            FirstName = "Omar",
            LastName = "Nabil",
            Email = "omar.nabil@hrsystem.local",
            JobTitle = "Frontend Engineer",
            Location = "Alexandria",
            HireDate = new DateOnly(2024, 4, 8),
            Status = EmployeeStatus.Active,
            DepartmentId = SeedIds.ProductDepartmentId,
            ManagerId = SeedIds.KarimEmployeeId,
            CreatedAtUtc = SeedCreatedAtUtc
        },
        new()
        {
            Id = SeedIds.MariamEmployeeId,
            EmployeeNumber = "EMP-1120",
            FirstName = "Mariam",
            LastName = "Samir",
            Email = "mariam.samir@hrsystem.local",
            JobTitle = "Account Executive",
            Location = "Dubai",
            HireDate = new DateOnly(2023, 8, 14),
            Status = EmployeeStatus.ContractReview,
            DepartmentId = SeedIds.SalesDepartmentId,
            ManagerId = SeedIds.LinaEmployeeId,
            CreatedAtUtc = SeedCreatedAtUtc
        },
        new()
        {
            Id = SeedIds.YoussefEmployeeId,
            EmployeeNumber = "EMP-1184",
            FirstName = "Youssef",
            LastName = "Galal",
            Email = "youssef.galal@hrsystem.local",
            JobTitle = "QA Analyst",
            Location = "Remote",
            HireDate = new DateOnly(2026, 4, 1),
            Status = EmployeeStatus.Probation,
            DepartmentId = SeedIds.DeliveryDepartmentId,
            ManagerId = SeedIds.KarimEmployeeId,
            CreatedAtUtc = SeedCreatedAtUtc
        },
        new()
        {
            Id = SeedIds.AhmedEmployeeId,
            EmployeeNumber = "EMP-1190",
            FirstName = "Ahmed",
            LastName = "Mohamed",
            Email = "ahmed.mohamed@hrsystem.local",
            JobTitle = "Backend Engineer",
            Location = "Cairo",
            HireDate = new DateOnly(2024, 9, 9),
            Status = EmployeeStatus.Active,
            DepartmentId = SeedIds.ProductDepartmentId,
            ManagerId = SeedIds.KarimEmployeeId,
            CreatedAtUtc = SeedCreatedAtUtc
        }
    ];

    private static readonly LeaveType[] LeaveTypes =
    [
        new() { Id = SeedIds.AnnualLeaveTypeId, Code = "ANNUAL", Name = "Annual Leave", AnnualAllowanceDays = 21, RequiresApproval = true, IsPaid = true, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.SickLeaveTypeId, Code = "SICK", Name = "Sick Leave", AnnualAllowanceDays = 10, RequiresApproval = true, IsPaid = true, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.CasualLeaveTypeId, Code = "CASUAL", Name = "Casual Leave", AnnualAllowanceDays = 5, RequiresApproval = true, IsPaid = true, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.CompassionateLeaveTypeId, Code = "COMPASSIONATE", Name = "Compassionate Leave", AnnualAllowanceDays = 3, RequiresApproval = true, IsPaid = true, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.EmergencyLeaveTypeId, Code = "EMERGENCY", Name = "Emergency Leave", AnnualAllowanceDays = 3, RequiresApproval = true, IsPaid = true, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.MarriageLeaveTypeId, Code = "MARRIAGE", Name = "Marriage Leave", AnnualAllowanceDays = 5, RequiresApproval = true, IsPaid = true, CreatedAtUtc = SeedCreatedAtUtc }
    ];

    private static readonly LeaveBalance[] LeaveBalances =
    [
        new() { Id = SeedIds.RawanAnnualBalanceId, EmployeeId = SeedIds.RawanEmployeeId, LeaveTypeId = SeedIds.AnnualLeaveTypeId, Year = 2026, EntitledDays = 8.5m, UsedDays = 0, PendingDays = 0, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.RawanSickBalanceId, EmployeeId = SeedIds.RawanEmployeeId, LeaveTypeId = SeedIds.SickLeaveTypeId, Year = 2026, EntitledDays = 3, UsedDays = 1, PendingDays = 0, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.RawanCasualBalanceId, EmployeeId = SeedIds.RawanEmployeeId, LeaveTypeId = SeedIds.CasualLeaveTypeId, Year = 2026, EntitledDays = 5, UsedDays = 0, PendingDays = 0, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.RawanCompassionateBalanceId, EmployeeId = SeedIds.RawanEmployeeId, LeaveTypeId = SeedIds.CompassionateLeaveTypeId, Year = 2026, EntitledDays = 3, UsedDays = 0, PendingDays = 0, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.RawanEmergencyBalanceId, EmployeeId = SeedIds.RawanEmployeeId, LeaveTypeId = SeedIds.EmergencyLeaveTypeId, Year = 2026, EntitledDays = 3, UsedDays = 0, PendingDays = 0, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.RawanMarriageBalanceId, EmployeeId = SeedIds.RawanEmployeeId, LeaveTypeId = SeedIds.MarriageLeaveTypeId, Year = 2026, EntitledDays = 5, UsedDays = 0, PendingDays = 0, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.NourAnnualBalanceId, EmployeeId = SeedIds.NourEmployeeId, LeaveTypeId = SeedIds.AnnualLeaveTypeId, Year = 2026, EntitledDays = 21, UsedDays = 8, PendingDays = 0, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.OmarAnnualBalanceId, EmployeeId = SeedIds.OmarEmployeeId, LeaveTypeId = SeedIds.AnnualLeaveTypeId, Year = 2026, EntitledDays = 21, UsedDays = 14, PendingDays = 4, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.MariamAnnualBalanceId, EmployeeId = SeedIds.MariamEmployeeId, LeaveTypeId = SeedIds.AnnualLeaveTypeId, Year = 2026, EntitledDays = 21, UsedDays = 17, PendingDays = 0, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.YoussefAnnualBalanceId, EmployeeId = SeedIds.YoussefEmployeeId, LeaveTypeId = SeedIds.AnnualLeaveTypeId, Year = 2026, EntitledDays = 15, UsedDays = 3, PendingDays = 0, CreatedAtUtc = SeedCreatedAtUtc }
    ];

    private static readonly LeaveRequest[] LeaveRequests =
    [
        new() { Id = SeedIds.OmarLeaveRequestId, EmployeeId = SeedIds.OmarEmployeeId, LeaveTypeId = SeedIds.AnnualLeaveTypeId, StartDate = new DateOnly(2026, 8, 4), EndDate = new DateOnly(2026, 8, 7), RequestedDays = 4, Status = LeaveRequestStatus.Pending, Reason = "Annual leave", RequestedAtUtc = new DateTime(2026, 7, 28, 8, 30, 0, DateTimeKind.Utc), CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.MariamLeaveRequestId, EmployeeId = SeedIds.MariamEmployeeId, LeaveTypeId = SeedIds.EmergencyLeaveTypeId, StartDate = new DateOnly(2026, 7, 30), EndDate = new DateOnly(2026, 7, 30), RequestedDays = 1, Status = LeaveRequestStatus.Pending, Reason = "Emergency leave", RequestedAtUtc = new DateTime(2026, 7, 28, 9, 15, 0, DateTimeKind.Utc), CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.YoussefLeaveRequestId, EmployeeId = SeedIds.YoussefEmployeeId, LeaveTypeId = SeedIds.SickLeaveTypeId, StartDate = new DateOnly(2026, 7, 28), EndDate = new DateOnly(2026, 7, 28), RequestedDays = 1, Status = LeaveRequestStatus.Approved, Reason = "Sick leave", RequestedAtUtc = new DateTime(2026, 7, 27, 7, 0, 0, DateTimeKind.Utc), ReviewedAtUtc = new DateTime(2026, 7, 27, 11, 45, 0, DateTimeKind.Utc), ReviewedByEmployeeId = SeedIds.NourEmployeeId, CreatedAtUtc = SeedCreatedAtUtc }
    ];

    private static readonly AttendanceRecord[] AttendanceRecords =
    [
        new() { Id = SeedIds.NourAttendanceId, EmployeeId = SeedIds.NourEmployeeId, WorkDate = new DateOnly(2026, 7, 28), CheckInTime = new TimeOnly(8, 57), CheckOutTime = new TimeOnly(17, 8), Status = AttendanceStatus.Present, CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.OmarAttendanceId, EmployeeId = SeedIds.OmarEmployeeId, WorkDate = new DateOnly(2026, 7, 28), CheckInTime = new TimeOnly(9, 24), CheckOutTime = new TimeOnly(17, 3), Status = AttendanceStatus.Late, Notes = "Needs HR review", CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.MariamAttendanceId, EmployeeId = SeedIds.MariamEmployeeId, WorkDate = new DateOnly(2026, 7, 28), CheckInTime = new TimeOnly(9, 5), Status = AttendanceStatus.MissingCheckout, Notes = "Auto reminder queued", CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.YoussefAttendanceId, EmployeeId = SeedIds.YoussefEmployeeId, WorkDate = new DateOnly(2026, 7, 28), CheckInTime = new TimeOnly(9, 0), CheckOutTime = new TimeOnly(17, 0), Status = AttendanceStatus.Remote, Notes = "Remote today", CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.AhmedAttendanceId, EmployeeId = SeedIds.AhmedEmployeeId, WorkDate = new DateOnly(2026, 7, 28), Status = AttendanceStatus.Absent, Notes = "Time off, back Aug 31, 2026", CreatedAtUtc = SeedCreatedAtUtc }
    ];

    private static readonly Contract[] Contracts =
    [
        new() { Id = SeedIds.NourContractId, EmployeeId = SeedIds.NourEmployeeId, Type = ContractType.FullTime, Status = ContractStatus.Active, StartDate = new DateOnly(2025, 5, 31), EndDate = new DateOnly(2027, 5, 31), CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.OmarContractId, EmployeeId = SeedIds.OmarEmployeeId, Type = ContractType.FullTime, Status = ContractStatus.Active, StartDate = new DateOnly(2025, 11, 18), EndDate = new DateOnly(2026, 11, 18), CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.MariamContractId, EmployeeId = SeedIds.MariamEmployeeId, Type = ContractType.FullTime, Status = ContractStatus.ReviewRequired, StartDate = new DateOnly(2025, 8, 14), EndDate = new DateOnly(2026, 8, 14), Notes = "Contract ends soon", CreatedAtUtc = SeedCreatedAtUtc },
        new() { Id = SeedIds.YoussefContractId, EmployeeId = SeedIds.YoussefEmployeeId, Type = ContractType.FullTime, Status = ContractStatus.Active, StartDate = new DateOnly(2026, 1, 10), EndDate = new DateOnly(2027, 1, 10), CreatedAtUtc = SeedCreatedAtUtc }
    ];
}
