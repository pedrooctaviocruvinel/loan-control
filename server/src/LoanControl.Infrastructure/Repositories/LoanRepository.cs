using LoanControl.Domain.Entities;
using LoanControl.Domain.Repositories;

namespace LoanControl.Infrastructure.Repositories;

public class LoanRepository(ApplicationDataContext applicationDataContext) : ILoanRepository
{
    private readonly ApplicationDataContext _applicationDataContext = applicationDataContext;

    public async Task Add(Loan loan) =>
        await _applicationDataContext.Loans.AddAsync(loan);

    public async Task SaveChanges() =>
        await _applicationDataContext.SaveChangesAsync();
}
