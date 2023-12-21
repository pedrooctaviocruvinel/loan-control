using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LoanControl.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateLoan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "loans",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "varchar(25)", nullable: false),
                    value = table.Column<decimal>(type: "numeric(18,4)", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamptz", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamptz", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_loans", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_loans_id",
                table: "loans",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "loans");
        }
    }
}
