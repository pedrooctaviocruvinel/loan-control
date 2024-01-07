using LoanControl.Application.BackupContext.Commands.DTOs;
using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.BackupContext.Commands;

public class ExecuteBackupCommandRequest : IRequest<ResultWrapper>
{
    public List<ExecuteBackupLoanDTO> Loans { get; set; }
}

