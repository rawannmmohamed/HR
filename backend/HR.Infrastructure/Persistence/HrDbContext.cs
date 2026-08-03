using HR.Domain.Attendance;
using HR.Domain.Contracts;
using HR.Domain.Employees;
using HR.Domain.Leave;
using HR.Infrastructure.Persistence.Seed;
using Microsoft.EntityFrameworkCore;

namespace HR.Infrastructure.Persistence;

public sealed class HrDbContext(DbContextOptions<HrDbContext> options) : DbContext(options)
{
    public DbSet<AttendanceRecord> AttendanceRecords => Set<AttendanceRecord>();
    public DbSet<Contract> Contracts => Set<Contract>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<LeaveBalance> LeaveBalances => Set<LeaveBalance>();
    public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();
    public DbSet<LeaveType> LeaveTypes => Set<LeaveType>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(HrDbContext).Assembly);
        HrSeedData.Apply(modelBuilder);
    }
}
