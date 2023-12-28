using LoanControl.CrossCutting.Core.Enums;
using LoanControl.CrossCutting.Core.Models;
using LoanControl.Domain.Repositories;

namespace LoanControl.Domain.Services;

public class PaymentService(IPaymentRepository paymentRepository)
{
    private readonly IPaymentRepository _paymentRepository = paymentRepository;

    public async Task<ResultWrapper> Remove(Guid id)
    {
        var payment = await _paymentRepository.GetById(id);

        if (payment == null)
            return new ResultWrapper(EErrorCode.DoesntExists);

        _paymentRepository.Delete(payment);
        await _paymentRepository.SaveChanges();

        return new ResultWrapper();
    }
}
