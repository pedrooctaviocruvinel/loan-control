using LoanControl.Application.LoanContext.Commands;
using LoanControl.Application.LoanContext.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace LoanControl.Presentation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoansController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> ListLoans()
    {
        var queryRequest = new ListLoansQueryRequest();
        var listLoansResult = await _mediator.Send(queryRequest);

        if (!listLoansResult.Success)
            return BadRequest(listLoansResult);

        return Ok(listLoansResult);
    }

    [HttpPost]
    public async Task<IActionResult> CreateLoan([FromBody] CreateLoanCommandRequest commandRequest)
    {
        var createLoanResult = await _mediator.Send(commandRequest);

        if (!createLoanResult.Success)
            return BadRequest(createLoanResult);

        return Ok(createLoanResult);
    }
}
