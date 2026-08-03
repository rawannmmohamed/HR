using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace HR.Infrastructure.Persistence;

public sealed class HrDbContextFactory : IDesignTimeDbContextFactory<HrDbContext>
{
    public HrDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<HrDbContext>();
        optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=HrSystem;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true");

        return new HrDbContext(optionsBuilder.Options);
    }
}
