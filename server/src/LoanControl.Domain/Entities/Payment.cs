namespace LoanControl.Domain.Entities;

public class Payment(decimal value, bool paid, DateTime expirationDate) : Entity
{
    public decimal Value { get; private set; } = value;
    public bool Paid { get; private set; } = paid;
    public DateTime ExpirationDate { get; private set; } = expirationDate;

    public Loan Loan { get; private set; }
}
