namespace LoanControl.Application.BackupContext.Commands.DTOs;

public class ExecuteBackupLoanPaymentDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public decimal Value { get; set; }
    public DateTime ExpirationDate { get; set; }
    public DateTime? PaidDate { get; set; }
}
