using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.PaymentContext.Commands;

public class UpdatePaymentCommandRequest : IRequest<ResultWrapper>
{
    public Guid Id { get; private set; }
    public decimal Value { get; set; }
    public bool Paid { get; set; }
    public DateTime ExpirationDate { get; set; }

    public void SetId(Guid id) =>
        Id = id;
}
