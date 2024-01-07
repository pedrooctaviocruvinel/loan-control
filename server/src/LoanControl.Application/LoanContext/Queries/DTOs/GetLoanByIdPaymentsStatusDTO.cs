namespace LoanControl.Application.LoanContext.Queries.DTOs;

public class GetLoanByIdPaymentsStatusDTO
{
    public int PaymentsCount { get; set; }
    public int PaymentsPaid { get; set; }
    public int RemainingPayments { get; set; }
    public DateTime NextPaymentDate { get; set; }
    public decimal TotalToBeReceived { get; set; }
    public decimal TotalReceived { get; set; }
    public decimal ExpectedProfit { get; set; }
    public decimal Profit { get; set; }
}
