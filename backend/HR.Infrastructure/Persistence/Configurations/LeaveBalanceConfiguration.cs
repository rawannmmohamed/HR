using HR.Domain.Leave;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Infrastructure.Persistence.Configurations;

internal sealed class LeaveBalanceConfiguration : IEntityTypeConfiguration<LeaveBalance>
{
    public void Configure(EntityTypeBuilder<LeaveBalance> builder)
    {
        builder.ToTable("LeaveBalances");
        builder.HasKey(balance => balance.Id);

        builder.Property(balance => balance.EntitledDays).HasPrecision(5, 2);
        builder.Property(balance => balance.UsedDays).HasPrecision(5, 2);
        builder.Property(balance => balance.PendingDays).HasPrecision(5, 2);
        builder.Ignore(balance => balance.RemainingDays);

        builder.HasIndex(balance => new { balance.EmployeeId, balance.LeaveTypeId, balance.Year }).IsUnique();

        builder
            .HasOne(balance => balance.Employee)
            .WithMany(employee => employee.LeaveBalances)
            .HasForeignKey(balance => balance.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(balance => balance.LeaveType)
            .WithMany(leaveType => leaveType.LeaveBalances)
            .HasForeignKey(balance => balance.LeaveTypeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
