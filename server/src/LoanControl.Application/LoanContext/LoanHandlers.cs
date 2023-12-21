using LoanControl.Application.LoanContext.Commands;
using LoanControl.CrossCutting.Core.Models;
using LoanControl.Domain.Entities;
using LoanControl.Domain.Services;
using MediatR;

namespace LoanControl.Application.LoanContext;

internal class LoanHandlers(LoanService loanService) : IRequestHandler<CreateLoanCommandRequest, ResultWrapper>
{
    private readonly LoanService _loanService = loanService;

    public async Task<ResultWrapper> Handle(CreateLoanCommandRequest commandRequest, CancellationToken cancellationToken)
    {
        var loan = new Loan(commandRequest.Name, commandRequest.Value);

        var createLoanResult = await _loanService.CreateLoan(loan);

        return createLoanResult;
    }
}
