namespace LoanControl.Application.LoanContext.Queries;

public class GetLoanByIdQueryResult
{
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int PaymentsCount { get => Payments.Count; }
    public int PaymentsPaid { get => Payments.Count(p => p.Paid); }
    public int RemainingPayments { get => PaymentsCount - PaymentsPaid; }
    public DateTime NextPaymentDate { get => Payments.Where(p => p.ExpirationDate > DateTime.Now).OrderBy(p => p.ExpirationDate).FirstOrDefault().ExpirationDate; }
    public decimal TotalToBeReceived { get => Payments.Sum(p => p.Value); }
    public decimal TotalReceived { get => Payments.Where(p => p.Paid).Sum(p => p.Value); }
    public decimal ExpectedProfit { get => TotalToBeReceived - TotalFunded; }
    public decimal Profit { get => TotalReceived - TotalFunded; }
    public List<GetLoanByIdPaymentDTO> Payments { get; set; }
}

public class GetLoanByIdPaymentDTO
{
    public Guid Id { get; set; }
    public decimal Value { get; set; }
    public DateTime ExpirationDate { get; set; }
    public DateTime? PaidDate { get; set; }
    public bool Paid { get => DateTime.Now >= PaidDate; }
}
