﻿// <auto-generated />
using System;
using LoanControl.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LoanControl.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDataContext))]
    [Migration("20231228203900_DeleteCascadePaymentsWhenDeleteLoan")]
    partial class DeleteCascadePaymentsWhenDeleteLoan
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("LoanControl.Domain.Entities.Loan", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamptz")
                        .HasColumnName("created_at");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(25)")
                        .HasColumnName("name");

                    b.Property<decimal>("TotalFunded")
                        .HasColumnType("decimal(18, 2)")
                        .HasColumnName("total_funded");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamptz")
                        .HasColumnName("updated_at");

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.ToTable("loans", (string)null);
                });

            modelBuilder.Entity("LoanControl.Domain.Entities.Payment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamptz")
                        .HasColumnName("created_at");

                    b.Property<DateTime>("ExpirationDate")
                        .HasColumnType("timestamptz")
                        .HasColumnName("expiration_date");

                    b.Property<Guid?>("LoanId")
                        .HasColumnType("uuid");

                    b.Property<bool>("Paid")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamptz")
                        .HasColumnName("updated_at");

                    b.Property<decimal>("Value")
                        .HasColumnType("decimal(18, 2)")
                        .HasColumnName("total_funded");

                    b.HasKey("Id");

                    b.HasIndex("LoanId");

                    b.ToTable("payments", (string)null);
                });

            modelBuilder.Entity("LoanControl.Domain.Entities.Payment", b =>
                {
                    b.HasOne("LoanControl.Domain.Entities.Loan", "Loan")
                        .WithMany("Payments")
                        .HasForeignKey("LoanId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Loan");
                });

            modelBuilder.Entity("LoanControl.Domain.Entities.Loan", b =>
                {
                    b.Navigation("Payments");
                });
#pragma warning restore 612, 618
        }
    }
}