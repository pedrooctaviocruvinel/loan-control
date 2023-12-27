namespace LoanControl.Domain.Entities;

public class Loan(string name, decimal totalFunded) : Entity
{
    public string Name { get; private set; } = name;
    public decimal TotalFunded { get; private set; } = totalFunded;

    public List<Payment> Payments { get; private set; } = [];

    public void AddPayments(List<Payment> payments) =>
        Payments.AddRange(payments);
}
