using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.BackupContext.Commands;

public class ExecuteBackupCommandRequest : IRequest<ResultWrapper>
{
    public List<ExecuteBackupLoanDTO> Loans { get; set; }
}

public class ExecuteBackupLoanDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }
    public List<ExecuteBackupLoanPaymentDTO> Payments { get; set; }
}

public class ExecuteBackupLoanPaymentDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public decimal Value { get; set; }
    public DateTime ExpirationDate { get; set; }
    public DateTime? PaidDate { get; set; }
}
