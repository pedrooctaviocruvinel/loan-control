using LoanControl.Domain.Entities;

namespace LoanControl.Domain.Repositories;

public interface ILoanRepository
{
    Task<IList<Loan>> List();
    Task<Loan> GetById(Guid id);
    Task Add(Loan loan);
    Task SaveChanges();
}
