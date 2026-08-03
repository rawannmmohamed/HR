using HR.Domain.Leave;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Infrastructure.Persistence.Configurations;

internal sealed class LeaveRequestConfiguration : IEntityTypeConfiguration<LeaveRequest>
{
    public void Configure(EntityTypeBuilder<LeaveRequest> builder)
    {
        builder.ToTable("LeaveRequests");
        builder.HasKey(request => request.Id);

        builder.Property(request => request.RequestedDays).HasPrecision(5, 2);
        builder.Property(request => request.Reason).HasMaxLength(500);
        builder.Property(request => request.ReviewNotes).HasMaxLength(500);
        builder.Property(request => request.Status).HasConversion<string>().HasMaxLength(40).IsRequired();

        builder
            .HasOne(request => request.Employee)
            .WithMany(employee => employee.LeaveRequests)
            .HasForeignKey(request => request.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(request => request.LeaveType)
            .WithMany(leaveType => leaveType.LeaveRequests)
            .HasForeignKey(request => request.LeaveTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(request => request.ReviewedByEmployee)
            .WithMany()
            .HasForeignKey(request => request.ReviewedByEmployeeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
