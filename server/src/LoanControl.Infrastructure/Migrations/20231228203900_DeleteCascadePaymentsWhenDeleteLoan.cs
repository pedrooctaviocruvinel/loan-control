using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LoanControl.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DeleteCascadePaymentsWhenDeleteLoan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_payments_loans_LoanId",
                table: "payments");

            migrationBuilder.AddForeignKey(
                name: "FK_payments_loans_LoanId",
                table: "payments",
                column: "LoanId",
                principalTable: "loans",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_payments_loans_LoanId",
                table: "payments");

            migrationBuilder.AddForeignKey(
                name: "FK_payments_loans_LoanId",
                table: "payments",
                column: "LoanId",
                principalTable: "loans",
                principalColumn: "id");
        }
    }
}
