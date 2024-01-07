namespace LoanControl.Application.LoanContext.Queries.DTOs;

public class ListLoansLoanDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }
    public DateTime CreatedAt { get; set; }
}
