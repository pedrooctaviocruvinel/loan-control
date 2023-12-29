using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.PaymentContext.Commands;

public class AddPaymentCommandRequest : IRequest<ResultWrapper>
{
    public Guid LoanId { get; private set; }
    public decimal Value { get; set; }
    public bool Paid { get; set; }
    public DateTime ExpirationDate { get; set; }

    public void SetLoanId(Guid loanId) =>
        LoanId = loanId;
}
