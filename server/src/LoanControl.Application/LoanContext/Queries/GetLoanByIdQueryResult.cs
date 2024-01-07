namespace LoanControl.Application.LoanContext.Queries;

public class GetLoanByIdQueryResult
{
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<GetLoanByIdPaymentDTO> Payments { get; set; }
    public GetLoanByIdLoanPaymentsStatusDTO? LoanPaymentsStatus { get; set; }

    public void BuildLoanPaymentsStatus()
    {
        if (Payments.Any())
            LoanPaymentsStatus = new GetLoanByIdLoanPaymentsStatusDTO(
                Payments.Count,
                Payments.Count(p => p.Paid),
                Payments.Count < 1 ? Payments.Where(p => p.ExpirationDate > DateTime.Now).OrderBy(p => p.ExpirationDate).FirstOrDefault().ExpirationDate : Payments.FirstOrDefault().ExpirationDate,
                Payments.Sum(p => p.Value),
                Payments.Where(p => p.Paid).Sum(p => p.Value),
                TotalFunded);
    }
}

public class GetLoanByIdPaymentDTO
{
    public Guid Id { get; set; }
    public decimal Value { get; set; }
    public DateTime ExpirationDate { get; set; }
    public DateTime? PaidDate { get; set; }
    public bool Paid { get => DateTime.Now >= PaidDate; }
}

public class GetLoanByIdLoanPaymentsStatusDTO
{
    public GetLoanByIdLoanPaymentsStatusDTO(
        int paymentsCount,
        int paymentsPaid,
        DateTime nextPaymentDate,
        decimal totalToBeReceived,
        decimal totalReceived,
        decimal totalFunded)
    {
        PaymentsCount = paymentsCount;
        PaymentsPaid = paymentsPaid;
        RemainingPayments = PaymentsCount - PaymentsPaid;
        NextPaymentDate = nextPaymentDate;
        TotalToBeReceived = totalToBeReceived;
        TotalReceived = totalReceived;
        ExpectedProfit = TotalToBeReceived - totalFunded;
        Profit = TotalReceived - totalFunded;
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
