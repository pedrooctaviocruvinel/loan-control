using LoanControl.CrossCutting.Core.Enums;
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

    public async Task<ResultWrapper> Execute(List<Loan> loans)
    {
        if (await _loanRepository.Any())
            return new ResultWrapper(EErrorCode.AlreadyHaveData);

        await _loanRepository.AddRange(loans);
        await _loanRepository.SaveChanges();

        return new ResultWrapper();
    }
}
