namespace LoanControl.Application.BackupContext.Commands.DTOs;

public class GenerateBackupLoanPaymentDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public decimal Value { get; private set; }
    public DateTime ExpirationDate { get; private set; }
    public DateTime? PaidDate { get; private set; }
}
