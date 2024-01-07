using AutoMapper;
using LoanControl.Application.LoanContext.Commands;
using LoanControl.Application.LoanContext.Queries;
using LoanControl.CrossCutting.Core.Models;
using LoanControl.Domain.Entities;
using LoanControl.Domain.Services;
using MediatR;

namespace LoanControl.Application.LoanContext;

internal class LoanHandlers(LoanService loanService, IMapper mapper) :
    IRequestHandler<ListLoansQueryRequest, ResultWrapper<ListLoansQueryResult>>,
    IRequestHandler<GetLoanByIdQueryRequest, ResultWrapper<GetLoanByIdQueryResult>>,
    IRequestHandler<CreateLoanCommandRequest, ResultWrapper>,
    IRequestHandler<UpdateLoanCommandRequest, ResultWrapper>,
    IRequestHandler<DeleteLoanCommandRequest, ResultWrapper>
{
    private readonly LoanService _loanService = loanService;
    private readonly IMapper _mapper = mapper;

    public async Task<ResultWrapper<ListLoansQueryResult>> Handle(ListLoansQueryRequest request, CancellationToken cancellationToken)
    {
        var listLoansResult = await _loanService.List();

        var mappedLoans = _mapper.Map<ListLoansQueryResult>(listLoansResult.Data);

        return new ResultWrapper<ListLoansQueryResult>(mappedLoans);
    }

    public async Task<ResultWrapper<GetLoanByIdQueryResult>> Handle(GetLoanByIdQueryRequest queryRequest, CancellationToken cancellationToken)
    {
        var getLoanByIdResult = await _loanService.GetById(queryRequest.Id);

        if (!getLoanByIdResult.Success)
            return new ResultWrapper<GetLoanByIdQueryResult>(getLoanByIdResult.ErrorCode);

        var mappedLoan = _mapper.Map<GetLoanByIdQueryResult>(getLoanByIdResult.Data);

        return new ResultWrapper<GetLoanByIdQueryResult>(mappedLoan);
    }

    public async Task<ResultWrapper> Handle(CreateLoanCommandRequest commandRequest, CancellationToken cancellationToken)
    {
        var loan = new Loan(commandRequest.Name, commandRequest.TotalFunded);
        var payments = commandRequest.Payments.Select(p => new Payment(p.Value, p.ExpirationDate, p.PaidDate)).ToList();

        loan.AddPayments(payments);

        var createLoanResult = await _loanService.Create(loan);

        return createLoanResult;
    }

    public async Task<ResultWrapper> Handle(UpdateLoanCommandRequest commandRequest, CancellationToken cancellationToken) =>
        await _loanService.Update(commandRequest.Id, commandRequest.Name, commandRequest.TotalFunded);

    public async Task<ResultWrapper> Handle(DeleteLoanCommandRequest commandRequest, CancellationToken cancellationToken) =>
        await _loanService.Delete(commandRequest.Id);
}
