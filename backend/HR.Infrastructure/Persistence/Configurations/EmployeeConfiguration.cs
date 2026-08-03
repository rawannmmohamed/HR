using HR.Domain.Employees;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Infrastructure.Persistence.Configurations;

internal sealed class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.ToTable("Employees");
        builder.HasKey(employee => employee.Id);

        builder.Property(employee => employee.EmployeeNumber).HasMaxLength(32).IsRequired();
        builder.Property(employee => employee.FirstName).HasMaxLength(120).IsRequired();
        builder.Property(employee => employee.LastName).HasMaxLength(120).IsRequired();
        builder.Property(employee => employee.Email).HasMaxLength(256).IsRequired();
        builder.Property(employee => employee.JobTitle).HasMaxLength(160).IsRequired();
        builder.Property(employee => employee.Location).HasMaxLength(120).IsRequired();
        builder.Property(employee => employee.Status).HasConversion<string>().HasMaxLength(40).IsRequired();

        builder.HasIndex(employee => employee.EmployeeNumber).IsUnique();
        builder.HasIndex(employee => employee.Email).IsUnique();

        builder
            .HasOne(employee => employee.Department)
            .WithMany(department => department.Employees)
            .HasForeignKey(employee => employee.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(employee => employee.Manager)
            .WithMany(manager => manager.DirectReports)
            .HasForeignKey(employee => employee.ManagerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
