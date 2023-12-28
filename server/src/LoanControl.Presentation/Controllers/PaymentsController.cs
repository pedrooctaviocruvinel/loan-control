using LoanControl.Application.PaymentContext.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LoanControl.Presentation.Controllers;

[Route("api/loans/[controller]")]
[ApiController]
public class PaymentsController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpDelete("{Id}")]
    public async Task<IActionResult> RemovePayment([FromRoute] RemovePaymentCommandRequest commandRequest)
    {
        var removePaymentResult = await _mediator.Send(commandRequest);

        if (!removePaymentResult.Success)
            return BadRequest(removePaymentResult);

        return Ok(removePaymentResult);
    }
}
