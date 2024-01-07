using LoanControl.Application.LoanContext.Commands.DTOs;
using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.LoanContext.Commands;

public class CreateLoanCommandRequest : IRequest<ResultWrapper>
{
    public string Name { get; set; }
    public decimal TotalFunded { get; set; }

    public List<CreateLoanPaymentDTO> Payments { get; set; }
}

