﻿using LoanControl.CrossCutting.Core.Models;
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

    public async Task<ResultWrapper> CreateLoan(Loan loan)
    {
        await _loanRepository.Add(loan);
        await _loanRepository.SaveChanges();

        return new ResultWrapper();
    }
}