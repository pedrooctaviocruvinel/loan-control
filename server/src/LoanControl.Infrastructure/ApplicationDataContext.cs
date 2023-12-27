using LoanControl.Domain.Entities;
using LoanControl.Infrastructure.Schemas;
using Microsoft.EntityFrameworkCore;

namespace LoanControl.Infrastructure;

public class ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : DbContext(options)
{
    public DbSet<Loan> Loans { get; set; }
    public DbSet<Payment> Payments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ConfigureLoanSchema();
        modelBuilder.ConfigurePaymentSchema();

        base.OnModelCreating(modelBuilder);
    }
}
