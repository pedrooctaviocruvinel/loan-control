namespace LoanControl.Application.LoanContext.Queries;

public class GetLoanByIdQueryResult
{
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<GetLoanByIdPaymentDTO> Payments { get; set; }
}

public class GetLoanByIdPaymentDTO
{
    public Guid Id { get; set; }
    public decimal Value { get; set; }
    public bool Paid { get; set; }
    public DateTime ExpirationDate { get; set; }
}
