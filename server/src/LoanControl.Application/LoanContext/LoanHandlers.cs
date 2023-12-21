using AutoMapper;
using LoanControl.Application.LoanContext.Commands;
using LoanControl.Application.LoanContext.Queries;
using LoanControl.CrossCutting.Core.Models;
using LoanControl.Domain.Entities;
using LoanControl.Domain.Services;
using MediatR;

namespace LoanControl.Application.LoanContext;

internal class LoanHandlers(LoanService loanService, IMapper mapper) :
    IRequestHandler<ListLoansQueryRequest, ResultWrapper<IList<ListLoansQueryResult>>>,
    IRequestHandler<CreateLoanCommandRequest, ResultWrapper>
{
    private readonly LoanService _loanService = loanService;
    private readonly IMapper _mapper = mapper;

    public async Task<ResultWrapper<IList<ListLoansQueryResult>>> Handle(ListLoansQueryRequest request, CancellationToken cancellationToken)
    {
        var listLoansResult = await _loanService.List();

        var mappedLoans = _mapper.Map<IList<ListLoansQueryResult>>(listLoansResult.Data);

        return new ResultWrapper<IList<ListLoansQueryResult>>(mappedLoans);
    }

    public async Task<ResultWrapper> Handle(CreateLoanCommandRequest commandRequest, CancellationToken cancellationToken)
    {
        var loan = new Loan(commandRequest.Name, commandRequest.Value);

        var createLoanResult = await _loanService.CreateLoan(loan);

        return createLoanResult;
    }
}
