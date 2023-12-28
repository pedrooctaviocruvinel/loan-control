using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.LoanContext.Commands;

public class DeleteLoanCommandRequest : IRequest<ResultWrapper>
{
    public Guid Id { get; set; }
}
