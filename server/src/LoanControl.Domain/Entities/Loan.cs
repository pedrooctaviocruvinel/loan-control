using LoanControl.Domain.Entities.ValueObjects;

namespace LoanControl.Domain.Entities;

public class Loan(string name, decimal totalFunded) : Entity
{
    public string Name { get; private set; } = name;
    public decimal TotalFunded { get; private set; } = totalFunded;

    public List<Payment> Payments { get; private set; } = [];

    public LoanPaymentsStatusVO? PaymentsStatus { get => BuildLoanPaymentsStatus(); }

    public void AddPayments(List<Payment> payments) =>
        Payments.AddRange(payments);

    public void Update(string name, decimal totalFunded)
    {
        Name = name;
        TotalFunded = totalFunded;

        Update();
    }

    private LoanPaymentsStatusVO BuildLoanPaymentsStatus()
    {
        if (!Payments.Any())
            return null;

        var paymentsCount = Payments.Count();
        var paymentsPaid = Payments.Count(p => p.Paid);
        var remainingPayments = paymentsCount - paymentsPaid;
        var nextPaymentDate = Payments.Count < 1 ? Payments.Where(p => p.ExpirationDate > DateTime.Now).OrderBy(p => p.ExpirationDate).FirstOrDefault().ExpirationDate : Payments.FirstOrDefault().ExpirationDate;
        var totalToBeReceived = Payments.Sum(p => p.Value);
        var totalReceived = Payments.Where(p => p.Paid).Sum(p => p.Value);
        var expectedProfit = totalToBeReceived - TotalFunded;
        var profit = totalReceived - TotalFunded;

        return new LoanPaymentsStatusVO(paymentsCount, paymentsPaid, remainingPayments, nextPaymentDate, totalToBeReceived, totalReceived, expectedProfit, profit);
    }
}

