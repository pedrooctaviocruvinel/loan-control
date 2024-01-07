namespace LoanControl.Application.LoanContext.Commands.DTOs;

public class CreateLoanPaymentDTO
{
    public decimal Value { get; set; }
    public DateTime ExpirationDate { get; set; }
    public DateTime? PaidDate { get; set; }
}
