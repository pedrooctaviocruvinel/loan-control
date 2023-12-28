using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.PaymentContext.Commands;

public class RemovePaymentCommandRequest : IRequest<ResultWrapper>
{
    public Guid Id { get; set; }
}
