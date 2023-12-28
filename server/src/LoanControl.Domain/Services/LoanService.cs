using LoanControl.CrossCutting.Core.Enums;
using LoanControl.CrossCutting.Core.Models;
using LoanControl.Domain.Entities;
using LoanControl.Domain.Repositories;

namespace LoanControl.Domain.Services;

public class LoanService(ILoanRepository loanRepository)
{
    private readonly ILoanRepository _loanRepository = loanRepository;

    public async Task<ResultWrapper<IList<Loan>>> List()
    {
        var loans = await _loanRepository.List();

        return new ResultWrapper<IList<Loan>>(loans);
    }

    public async Task<ResultWrapper<Loan>> GetById(Guid id)
    {
        var loan = await _loanRepository.GetById(id, true);

        if (loan == null)
            return new ResultWrapper<Loan>(EErrorCode.LoanDoesntExists);

        return new ResultWrapper<Loan>(loan);
    }

    public async Task<ResultWrapper> CreateLoan(Loan loan)
    {
        await _loanRepository.Add(loan);
        await _loanRepository.SaveChanges();

        return new ResultWrapper();
    }

    public async Task<ResultWrapper> Update(Guid id, string name, decimal totalFunded)
    {
        var loan = await _loanRepository.GetById(id);

        if (loan == null)
            return new ResultWrapper(EErrorCode.LoanDoesntExists);

        loan.Update(name, totalFunded);

        _loanRepository.Update(loan);
        await _loanRepository.SaveChanges();

        return new ResultWrapper();
    }
}
