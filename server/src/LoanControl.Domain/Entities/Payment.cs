namespace LoanControl.Domain.Entities;

public class Payment : Entity
{
    public Payment(decimal value, bool paid, DateTime expirationDate)
    {
        Value = value;
        Paid = paid;
        ExpirationDate = expirationDate;
    }

    public Payment(decimal value, bool paid, DateTime expirationDate, Loan loan)
    {
        Value = value;
        Paid = paid;
        ExpirationDate = expirationDate;
        Loan = loan;
    }

    public decimal Value { get; private set; }
    public bool Paid { get; private set; }
    public DateTime ExpirationDate { get; private set; }

    public Loan Loan { get; private set; }
}
