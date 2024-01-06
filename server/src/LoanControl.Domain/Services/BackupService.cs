using LoanControl.CrossCutting.Core.Models;
using LoanControl.Domain.Entities;
using LoanControl.Domain.Repositories;

namespace LoanControl.Domain.Services;

public class BackupService(ILoanRepository loanRepository)
{
    private readonly ILoanRepository _loanRepository = loanRepository;

    public async Task<ResultWrapper<IList<Loan>>> Generate()
    {
        var loans = await _loanRepository.List(true);

        return new ResultWrapper<IList<Loan>>(loans);
    }
}
