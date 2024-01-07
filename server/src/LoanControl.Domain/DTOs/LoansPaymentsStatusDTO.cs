using LoanControl.Domain.DTOs.ValueObjects;
using LoanControl.Domain.Entities;

namespace LoanControl.Domain.DTOs;

public class LoansPaymentsStatusDTO
{
    public LoansPaymentsStatusDTO(List<Loan> loans)
    {
        Loans = loans;

        var totalFunded = Loans.Sum(l => l.TotalFunded);
        var totalToBeReceived = Loans.Sum(l => l.Payments.Sum(p => p.Value));
        var totalReceived = Loans.Sum(l => l.Payments.Where(p => p.Paid).Sum(p => p.Value));
        var expectedProfit = totalToBeReceived - totalFunded;
        var profit = totalReceived - totalFunded;

        PaymentsStatus = new LoansPaymentsStatusVO(totalFunded, totalToBeReceived, totalReceived, expectedProfit, profit);
    }

    public List<Loan> Loans { get; set; }
    public LoansPaymentsStatusVO PaymentsStatus { get; set; }
}
