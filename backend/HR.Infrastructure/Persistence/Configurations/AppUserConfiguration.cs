using HR.Domain.Auth;
using HR.Domain.Employees;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Infrastructure.Persistence.Configurations;

internal sealed class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder.ToTable("AppUsers");
        builder.HasKey(user => user.Id);

        builder.Property(user => user.Email).HasMaxLength(256).IsRequired();
        builder.Property(user => user.PasswordHash).HasMaxLength(500).IsRequired();
        builder.Property(user => user.Role).HasConversion<string>().HasMaxLength(40).IsRequired();

        builder.HasIndex(user => user.Email).IsUnique();

        builder
            .HasOne(user => user.Employee)
            .WithOne()
            .HasForeignKey<AppUser>(user => user.EmployeeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
