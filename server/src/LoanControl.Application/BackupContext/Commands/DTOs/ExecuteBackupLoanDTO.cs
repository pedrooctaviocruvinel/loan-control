namespace LoanControl.Application.BackupContext.Commands.DTOs;

public class ExecuteBackupLoanDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }
    public List<ExecuteBackupLoanPaymentDTO> Payments { get; set; }
}
