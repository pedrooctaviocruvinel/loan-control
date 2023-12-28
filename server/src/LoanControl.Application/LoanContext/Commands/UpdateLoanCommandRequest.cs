using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.LoanContext.Commands;

public class UpdateLoanCommandRequest : IRequest<ResultWrapper>
{
    public Guid Id { get; private set; }
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }

    public void SetId(Guid id) =>
        Id = id;
}
