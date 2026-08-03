using HR.Domain.Attendance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Infrastructure.Persistence.Configurations;

internal sealed class AttendanceRecordConfiguration : IEntityTypeConfiguration<AttendanceRecord>
{
    public void Configure(EntityTypeBuilder<AttendanceRecord> builder)
    {
        builder.ToTable("AttendanceRecords");
        builder.HasKey(record => record.Id);

        builder.Property(record => record.Status).HasConversion<string>().HasMaxLength(40).IsRequired();
        builder.Property(record => record.Notes).HasMaxLength(500);

        builder.HasIndex(record => new { record.EmployeeId, record.WorkDate }).IsUnique();

        builder
            .HasOne(record => record.Employee)
            .WithMany(employee => employee.AttendanceRecords)
            .HasForeignKey(record => record.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
