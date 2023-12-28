using LoanControl.Domain.Entities;

namespace LoanControl.Domain.Repositories;

public interface IPaymentRepository
{
    Task<Payment> GetById(Guid id);
    void Delete(Payment payment);
    Task SaveChanges();
}
