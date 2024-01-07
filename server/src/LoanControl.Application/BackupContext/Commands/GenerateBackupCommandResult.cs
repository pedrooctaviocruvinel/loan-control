namespace LoanControl.Application.BackupContext.Commands;

public class GenerateBackupCommandResult
{
    public List<GenerateBackupLoanDTO> Loans { get; set; }
}

public class GenerateBackupLoanDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }

    public List<GenerateBackupLoanPaymentDTO> Payments { get; set; }
}

public class GenerateBackupLoanPaymentDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public decimal Value { get; private set; }
    public DateTime ExpirationDate { get; private set; }
    public DateTime? PaidDate { get; private set; }
}
