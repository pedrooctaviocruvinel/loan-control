using LoanControl.CrossCutting.Core.Enums;
using LoanControl.CrossCutting.Core.Models;
using LoanControl.Domain.Entities;
using LoanControl.Domain.Repositories;

namespace LoanControl.Domain.Services;

public class PaymentService(IPaymentRepository paymentRepository, ILoanRepository loanRepository)
{
    private readonly IPaymentRepository _paymentRepository = paymentRepository;
    private readonly ILoanRepository _loanRepository = loanRepository;

    public async Task<ResultWrapper> Add(Guid loanId, decimal value, bool paid, DateTime expirationDate)
    {
        var loan = await _loanRepository.GetById(loanId);

        if (loan == null)
            return new ResultWrapper(EErrorCode.LoanDoesntExists);

        var payment = new Payment(value, paid, expirationDate, loan);

        await _paymentRepository.Add(payment);
        await _paymentRepository.SaveChanges();

        return new ResultWrapper();
    }

    public async Task<ResultWrapper> Update(Guid id, decimal value, bool paid, DateTime expirationDate)
    {
        var payment = await _paymentRepository.GetById(id);

        if (payment == null)
            return new ResultWrapper(EErrorCode.DoesntExists);

        payment.Update(value, paid, expirationDate);

        _paymentRepository.Update(payment);
        await _paymentRepository.SaveChanges();

        return new ResultWrapper();
    }

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
