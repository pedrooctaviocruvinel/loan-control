using LoanControl.Domain.Entities;
using LoanControl.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace LoanControl.Infrastructure.Repositories;

public class LoanRepository(ApplicationDataContext applicationDataContext) : ILoanRepository
{
    private readonly ApplicationDataContext _applicationDataContext = applicationDataContext;

    public async Task<IList<Loan>> List() =>
        await _applicationDataContext.Loans.ToListAsync();

    public async Task<Loan> GetById(Guid id) =>
        await _applicationDataContext.Loans
            .Include(l => l.Payments)
            .FirstOrDefaultAsync(l => l.Id == id);

    public async Task Add(Loan loan) =>
        await _applicationDataContext.Loans.AddAsync(loan);

    public async Task SaveChanges() =>
        await _applicationDataContext.SaveChangesAsync();
}
