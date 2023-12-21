using LoanControl.Domain.Entities;

namespace LoanControl.Domain.Repositories;

public interface ILoanRepository
{
    Task Add(Loan loan);
    Task SaveChanges();
}
