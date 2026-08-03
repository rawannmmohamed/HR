using HR.Domain.Leave;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Infrastructure.Persistence.Configurations;

internal sealed class LeaveTypeConfiguration : IEntityTypeConfiguration<LeaveType>
{
    public void Configure(EntityTypeBuilder<LeaveType> builder)
    {
        builder.ToTable("LeaveTypes");
        builder.HasKey(leaveType => leaveType.Id);

        builder.Property(leaveType => leaveType.Code).HasMaxLength(32).IsRequired();
        builder.Property(leaveType => leaveType.Name).HasMaxLength(120).IsRequired();
        builder.Property(leaveType => leaveType.AnnualAllowanceDays).HasPrecision(5, 2);

        builder.HasIndex(leaveType => leaveType.Code).IsUnique();
    }
}
