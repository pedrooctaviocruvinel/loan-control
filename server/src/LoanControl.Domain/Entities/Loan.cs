namespace LoanControl.Domain.Entities;

public class Loan(string name, decimal value) : Entity
{
    public string Name { get; private set; } = name;
    public decimal Value { get; private set; } = value;
}
