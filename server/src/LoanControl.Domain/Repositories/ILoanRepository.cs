using LoanControl.Domain.Entities;

namespace LoanControl.Domain.Repositories;

public interface ILoanRepository
{
    Task<IList<Loan>> List(bool includePayments = false);
    Task<Loan> GetById(Guid id, bool includePayments = false);
    Task Add(Loan loan);
    void Update(Loan loan);
    void Delete(Loan loan);
    Task SaveChanges();
}
