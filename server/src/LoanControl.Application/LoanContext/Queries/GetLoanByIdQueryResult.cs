namespace LoanControl.Application.LoanContext.Queries;

public class GetLoanByIdQueryResult
{
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<GetLoanByIdPaymentDTO> Payments { get; set; }
    public GetLoanByIdPaymentsStatusDTO? PaymentsStatus { get; set; }
}

public class GetLoanByIdPaymentDTO
{
    public Guid Id { get; set; }
    public decimal Value { get; set; }
    public DateTime ExpirationDate { get; set; }
    public DateTime? PaidDate { get; set; }
    public bool Paid { get; set; }
}

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
