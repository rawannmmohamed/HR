using HR.Domain.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Infrastructure.Persistence.Configurations;

internal sealed class ContractConfiguration : IEntityTypeConfiguration<Contract>
{
    public void Configure(EntityTypeBuilder<Contract> builder)
    {
        builder.ToTable("Contracts");
        builder.HasKey(contract => contract.Id);

        builder.Property(contract => contract.Type).HasConversion<string>().HasMaxLength(40).IsRequired();
        builder.Property(contract => contract.Status).HasConversion<string>().HasMaxLength(40).IsRequired();
        builder.Property(contract => contract.Notes).HasMaxLength(500);

        builder.HasIndex(contract => new { contract.EmployeeId, contract.EndDate });

        builder
            .HasOne(contract => contract.Employee)
            .WithMany(employee => employee.Contracts)
            .HasForeignKey(contract => contract.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
