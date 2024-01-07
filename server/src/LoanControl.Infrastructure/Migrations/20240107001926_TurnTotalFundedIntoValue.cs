using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LoanControl.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class TurnTotalFundedIntoValue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "total_funded",
                table: "payments",
                newName: "value");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "value",
                table: "payments",
                newName: "total_funded");
        }
    }
}
