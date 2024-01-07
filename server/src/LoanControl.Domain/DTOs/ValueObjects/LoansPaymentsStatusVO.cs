namespace LoanControl.Domain.DTOs.ValueObjects;

public class LoansPaymentsStatusVO(decimal totalFunded, decimal totalToBeReceived, decimal totalReceived, decimal expectedProfit, decimal profit)
{
    public decimal TotalFunded { get; } = totalFunded;
    public decimal TotalToBeReceived { get; } = totalToBeReceived;
    public decimal TotalReceived { get; } = totalReceived;
    public decimal ExpectedProfit { get; } = expectedProfit;
    public decimal Profit { get; } = profit;
}
