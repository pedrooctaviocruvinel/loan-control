using LoanControl.Domain.Entities;

namespace LoanControl.Domain.Repositories;

public interface ILoanRepository
{
    Task<IList<Loan>> List(bool includePayments = false);
    Task<Loan> GetById(Guid id, bool includePayments = false);
    Task<bool> Any();
    Task Add(Loan loan);
    Task AddRange(List<Loan> loans);
    void Update(Loan loan);
    void Delete(Loan loan);
    Task SaveChanges();
}
