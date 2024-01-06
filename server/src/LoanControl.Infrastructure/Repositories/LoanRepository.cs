using LoanControl.Domain.Entities;
using LoanControl.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace LoanControl.Infrastructure.Repositories;

public class LoanRepository(ApplicationDataContext applicationDataContext) : ILoanRepository
{
    private readonly ApplicationDataContext _applicationDataContext = applicationDataContext;

    public async Task<IList<Loan>> List(bool includePayments = false)
    {
        IQueryable<Loan> loanQuery = _applicationDataContext.Loans;

        if (includePayments)
            loanQuery = _applicationDataContext.Loans.Include(l => l.Payments);

        return await loanQuery.ToListAsync();
    }

    public async Task<Loan> GetById(Guid id, bool includePayments = false)
    {
        if (!includePayments)
            return await _applicationDataContext.Loans.FirstOrDefaultAsync(l => l.Id == id);

        return await _applicationDataContext.Loans
            .Include(l => l.Payments)
            .FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task Add(Loan loan) =>
        await _applicationDataContext.Loans.AddAsync(loan);

    public void Update(Loan loan) =>
        _applicationDataContext.Loans.Update(loan);

    public void Delete(Loan loan) =>
        _applicationDataContext.Loans.Remove(loan);

    public async Task SaveChanges() =>
        await _applicationDataContext.SaveChangesAsync();
}
