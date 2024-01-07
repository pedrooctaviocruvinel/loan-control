using LoanControl.Application.LoanContext.Queries.DTOs;

namespace LoanControl.Application.LoanContext.Queries;

public class GetLoanByIdQueryResult
{
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<GetLoanByIdPaymentDTO> Payments { get; set; }
    public GetLoanByIdPaymentsStatusDTO PaymentsStatus { get; set; }
}

