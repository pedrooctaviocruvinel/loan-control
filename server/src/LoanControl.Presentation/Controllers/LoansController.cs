using LoanControl.Application.LoanContext.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LoanControl.Presentation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoansController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpPost]
    public async Task<IActionResult> CreateLoan([FromBody] CreateLoanCommandRequest commandRequest)
    {
        var createLoanResult = await _mediator.Send(commandRequest);

        if (!createLoanResult.Success)
            return BadRequest(createLoanResult);

        return Ok(createLoanResult);
    }
}
