using LoanControl.Infrastructure.Schemas;
using Microsoft.EntityFrameworkCore;

namespace LoanControl.Infrastructure;

public class ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ConfigureLoanSchema();

        base.OnModelCreating(modelBuilder);
    }
}
