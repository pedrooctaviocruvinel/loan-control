using LoanControl.Application.PaymentContext.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LoanControl.Presentation.Controllers;

[Route("api")]
[ApiController]
public class PaymentsController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpPost("loans/{loanId}/payments")]
    public async Task<IActionResult> AddPayment([FromRoute] Guid loanId, [FromBody] AddPaymentCommandRequest commandRequest)
    {
        commandRequest.SetLoanId(loanId);

        var addPaymentResult = await _mediator.Send(commandRequest);

        if (!addPaymentResult.Success)
            return BadRequest(addPaymentResult);

        return Ok(addPaymentResult);
    }

    [HttpDelete("loans/payments/{Id}")]
    public async Task<IActionResult> RemovePayment([FromRoute] RemovePaymentCommandRequest commandRequest)
    {
        var removePaymentResult = await _mediator.Send(commandRequest);

        if (!removePaymentResult.Success)
            return BadRequest(removePaymentResult);

        return Ok(removePaymentResult);
    }
}
