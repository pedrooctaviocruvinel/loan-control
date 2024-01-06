using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.BackupContext.Commands
{
    public class GenerateBackupCommandRequest : IRequest<ResultWrapper<GenerateBackupCommandResult>> { }
}
