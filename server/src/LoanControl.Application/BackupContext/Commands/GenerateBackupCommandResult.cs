using LoanControl.Application.BackupContext.Commands.DTOs;

namespace LoanControl.Application.BackupContext.Commands;

public class GenerateBackupCommandResult
{
    public List<GenerateBackupLoanDTO> Loans { get; set; }
}
