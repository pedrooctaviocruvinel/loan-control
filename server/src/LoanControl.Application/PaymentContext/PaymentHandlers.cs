using LoanControl.Application.PaymentContext.Commands;
using LoanControl.CrossCutting.Core.Models;
using LoanControl.Domain.Services;
using MediatR;

namespace LoanControl.Application.PaymentContext;

public class PaymentHandlers(PaymentService paymentService) : IRequestHandler<RemovePaymentCommandRequest, ResultWrapper>
{
    private readonly PaymentService _paymentService = paymentService;

    public async Task<ResultWrapper> Handle(RemovePaymentCommandRequest commandRequest, CancellationToken cancellationToken) =>
        await _paymentService.Remove(commandRequest.Id);
}
