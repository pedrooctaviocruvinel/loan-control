namespace LoanControl.Application.BackupContext.Commands.DTOs;

public class GenerateBackupLoanDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }

    public List<GenerateBackupLoanPaymentDTO> Payments { get; set; }
}
