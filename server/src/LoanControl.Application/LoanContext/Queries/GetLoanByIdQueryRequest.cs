using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.LoanContext.Queries;

public class GetLoanByIdQueryRequest : IRequest<ResultWrapper<GetLoanByIdQueryResult>>
{
    public Guid Id { get; set; }
}
