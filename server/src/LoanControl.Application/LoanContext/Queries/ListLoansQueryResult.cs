namespace LoanControl.Application.LoanContext.Queries;

public class ListLoansQueryResult
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }
    public DateTime CreatedAt { get; set; }
}
