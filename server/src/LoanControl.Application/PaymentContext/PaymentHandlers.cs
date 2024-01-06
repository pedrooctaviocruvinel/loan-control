using LoanControl.Application.PaymentContext.Commands;
using LoanControl.CrossCutting.Core.Models;
using LoanControl.Domain.Services;
using MediatR;

namespace LoanControl.Application.PaymentContext;

public class PaymentHandlers(PaymentService paymentService) :
    IRequestHandler<RemovePaymentCommandRequest, ResultWrapper>,
    IRequestHandler<AddPaymentCommandRequest, ResultWrapper>,
    IRequestHandler<UpdatePaymentCommandRequest, ResultWrapper>
{
    private readonly PaymentService _paymentService = paymentService;

    public async Task<ResultWrapper> Handle(AddPaymentCommandRequest commandRequest, CancellationToken cancellationToken) =>
        await _paymentService.Add(commandRequest.LoanId, commandRequest.Value, commandRequest.ExpirationDate, commandRequest.PaidDate);

    public async Task<ResultWrapper> Handle(RemovePaymentCommandRequest commandRequest, CancellationToken cancellationToken) =>
        await _paymentService.Remove(commandRequest.Id);

    public async Task<ResultWrapper> Handle(UpdatePaymentCommandRequest commandRequest, CancellationToken cancellationToken) =>
        await _paymentService.Update(commandRequest.Id, commandRequest.Value, commandRequest.ExpirationDate, commandRequest.PaidDate);
}
