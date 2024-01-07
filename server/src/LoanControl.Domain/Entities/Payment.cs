namespace LoanControl.Domain.Entities;

public class Payment : Entity
{
    public Payment(decimal value, DateTime expirationDate, DateTime? paidDate)
    {
        Value = value;
        ExpirationDate = expirationDate;
        PaidDate = paidDate;
    }

    public Payment(decimal value, DateTime expirationDate, DateTime? paidDate, Loan loan)
    {
        Value = value;
        ExpirationDate = expirationDate;
        PaidDate = paidDate;
        Loan = loan;
    }

    public decimal Value { get; private set; }

    public DateTime ExpirationDate { get; private set; }
    public DateTime? PaidDate { get; private set; }
    public bool Paid { get => DateTime.Now >= PaidDate; }

    public Loan Loan { get; private set; }

    public void Update(decimal value, DateTime expirationDate, DateTime? paidDate)
    {
        Value = value;
        ExpirationDate = expirationDate;
        PaidDate = paidDate;

        Update();
    }
}
