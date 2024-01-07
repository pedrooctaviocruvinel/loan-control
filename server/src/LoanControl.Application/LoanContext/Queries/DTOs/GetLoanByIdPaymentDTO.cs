namespace LoanControl.Application.LoanContext.Queries.DTOs;

public class GetLoanByIdPaymentDTO
{
    public Guid Id { get; set; }
    public decimal Value { get; set; }
    public DateTime ExpirationDate { get; set; }
    public DateTime? PaidDate { get; set; }
    public bool Paid { get; set; }
}
