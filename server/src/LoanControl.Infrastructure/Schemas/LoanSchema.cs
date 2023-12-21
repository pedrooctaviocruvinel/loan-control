using LoanControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LoanControl.Infrastructure.Schemas;

internal static class LoanSchema
{
    public static void ConfigureLoanSchema(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Loan>(etb =>
        {
            etb.ToTable("loans");

            etb.HasKey(l => l.Id);

            etb.HasIndex(l => l.Id);

            etb.Property(l => l.Id)
                .HasColumnName("id")
                .HasColumnType("uuid")
                .IsRequired();

            etb.Property(l => l.Name)
                .HasColumnName("name")
                .HasColumnType("varchar(25)")
                .IsRequired();

            etb.Property(l => l.Value)
                .HasColumnName("value")
                .HasColumnType("decimal(18, 4)")
                .IsRequired();

            etb.Property(l => l.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("timestamptz")
                .IsRequired();

            etb.Property(l => l.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("timestamptz")
                .IsRequired();
        });
    }
}
