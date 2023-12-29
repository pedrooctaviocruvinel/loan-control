using LoanControl.Domain.Entities;
using LoanControl.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace LoanControl.Infrastructure.Repositories;

public class PaymentRepository(ApplicationDataContext applicationDataContext) : IPaymentRepository
{
    private readonly ApplicationDataContext _applicationDataContext = applicationDataContext;

    public async Task<Payment> GetById(Guid id) =>
        await _applicationDataContext.Payments.FirstOrDefaultAsync(p => p.Id == id);

    public async Task Add(Payment payment) =>
        await _applicationDataContext.Payments.AddAsync(payment);

    public void Update(Payment payment) =>
        _applicationDataContext.Payments.Update(payment);

    public void Delete(Payment payment) =>
        _applicationDataContext.Payments.Remove(payment);

    public async Task SaveChanges() =>
        await _applicationDataContext.SaveChangesAsync();
}
