using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LoanControl.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPaidDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Paid",
                table: "payments");

            migrationBuilder.AddColumn<DateTime>(
                name: "paid_date",
                table: "payments",
                type: "timestamptz",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "paid_date",
                table: "payments");

            migrationBuilder.AddColumn<bool>(
                name: "Paid",
                table: "payments",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
