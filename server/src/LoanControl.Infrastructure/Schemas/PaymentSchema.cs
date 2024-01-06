using LoanControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LoanControl.Infrastructure.Schemas;

internal static class PaymentSchema
{
    public static void ConfigurePaymentSchema(this ModelBuilder modelBuilder) =>
        modelBuilder.Entity<Payment>(etb =>
        {
            etb.ToTable("payments");

            etb.HasKey(p => p.Id);

            etb.Property(p => p.Id)
                .HasColumnName("id")
                .HasColumnType("uuid")
                .IsRequired();

            etb.Property(p => p.Value)
               .HasColumnName("total_funded")
               .HasColumnType("decimal(18, 2)")
               .IsRequired();

            etb.Property(p => p.ExpirationDate)
                .HasColumnName("expiration_date")
                .HasColumnType("timestamptz")
                .IsRequired();

            etb.Property(p => p.PaidDate)
                .HasColumnName("paid_date")
                .HasColumnType("timestamptz");

            etb.Property(p => p.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("timestamptz")
                .IsRequired();

            etb.Property(p => p.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("timestamptz")
                .IsRequired();

            etb.HasOne(p => p.Loan)
                .WithMany(l => l.Payments);
        });
}
