namespace LoanControl.Application.LoanContext.Queries.DTOs;

public class ListLoansPaymentsStatusDTO
{
    public decimal TotalFunded { get; set; }
    public decimal TotalToBeReceived { get; set; }
    public decimal TotalReceived { get; set; }
    public decimal ExpectedProfit { get; set; }
    public decimal Profit { get; set; }
}
