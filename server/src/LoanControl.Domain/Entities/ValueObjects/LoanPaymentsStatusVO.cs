namespace LoanControl.Domain.Entities.ValueObjects;

public class LoanPaymentsStatusVO
{
    public LoanPaymentsStatusVO(int paymentsCount, int paymentsPaid, int remainingPayments, DateTime nextPaymentDate, decimal totalToBeReceived, decimal totalReceived, decimal expectedProfit, decimal profit)
    {
        PaymentsCount = paymentsCount;
        PaymentsPaid = paymentsPaid;
        RemainingPayments = remainingPayments;
        NextPaymentDate = nextPaymentDate;
        TotalToBeReceived = totalToBeReceived;
        TotalReceived = totalReceived;
        ExpectedProfit = expectedProfit;
        Profit = profit;
    }

    public int PaymentsCount { get; }
    public int PaymentsPaid { get; }
    public int RemainingPayments { get; }
    public DateTime NextPaymentDate { get; }
    public decimal TotalToBeReceived { get; }
    public decimal TotalReceived { get; }
    public decimal ExpectedProfit { get; }
    public decimal Profit { get; }
}
