namespace LoanControl.Domain.Entities.ValueObjects;

public class LoanPaymentsStatusVO(int paymentsCount, int paymentsPaid, int remainingPayments, DateTime nextPaymentDate, decimal totalToBeReceived, decimal totalReceived, decimal expectedProfit, decimal profit)
{
    public int PaymentsCount { get; } = paymentsCount;
    public int PaymentsPaid { get; } = paymentsPaid;
    public int RemainingPayments { get; } = remainingPayments;
    public DateTime NextPaymentDate { get; } = nextPaymentDate;
    public decimal TotalToBeReceived { get; } = totalToBeReceived;
    public decimal TotalReceived { get; } = totalReceived;
    public decimal ExpectedProfit { get; } = expectedProfit;
    public decimal Profit { get; } = profit;
}
