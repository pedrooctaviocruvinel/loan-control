using LoanControl.Domain.Entities;

namespace LoanControl.Domain.Repositories;

public interface IPaymentRepository
{
    Task<Payment> GetById(Guid id);
    Task Add(Payment payment);
    void Delete(Payment payment);
    Task SaveChanges();
}
