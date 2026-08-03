using HR.Domain.Employees;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Infrastructure.Persistence.Configurations;

internal sealed class DepartmentConfiguration : IEntityTypeConfiguration<Department>
{
    public void Configure(EntityTypeBuilder<Department> builder)
    {
        builder.ToTable("Departments");
        builder.HasKey(department => department.Id);

        builder.Property(department => department.Code).HasMaxLength(32).IsRequired();
        builder.Property(department => department.Name).HasMaxLength(160).IsRequired();

        builder.HasIndex(department => department.Code).IsUnique();
    }
}
