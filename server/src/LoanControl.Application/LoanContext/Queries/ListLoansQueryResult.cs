using LoanControl.Application.LoanContext.Queries.DTOs;

namespace LoanControl.Application.LoanContext.Queries;

public class ListLoansQueryResult
{
    public List<ListLoansLoanDTO> Loans { get; set; }
    public ListLoansPaymentsStatusDTO PaymentsStatus { get; set; }
}
