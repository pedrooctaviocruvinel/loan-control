using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LoanControl.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreatePayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "value",
                table: "loans",
                newName: "total_funded");

            migrationBuilder.CreateTable(
                name: "payments",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    total_funded = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Paid = table.Column<bool>(type: "boolean", nullable: false),
                    expiration_date = table.Column<DateTime>(type: "timestamptz", nullable: false),
                    LoanId = table.Column<Guid>(type: "uuid", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payments", x => x.id);
                    table.ForeignKey(
                        name: "FK_payments_loans_LoanId",
                        column: x => x.LoanId,
                        principalTable: "loans",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_payments_LoanId",
                table: "payments",
                column: "LoanId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "payments");

            migrationBuilder.RenameColumn(
                name: "total_funded",
                table: "loans",
                newName: "value");
        }
    }
}
