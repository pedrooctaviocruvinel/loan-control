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

    [HttpGet("{Id}")]
    public async Task<IActionResult> GetLoanById([FromRoute] GetLoanByIdQueryRequest queryRequest)
    {
        var getLoanByIdResult = await _mediator.Send(queryRequest);

        if (!getLoanByIdResult.Success)
            return BadRequest(getLoanByIdResult);

        return Ok(getLoanByIdResult);
    }

    [HttpPost]
    public async Task<IActionResult> CreateLoan([FromBody] CreateLoanCommandRequest commandRequest)
    {
        var createLoanResult = await _mediator.Send(commandRequest);

        if (!createLoanResult.Success)
            return BadRequest(createLoanResult);

        return Ok(createLoanResult);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLoan([FromRoute] Guid id, [FromBody] UpdateLoanCommandRequest commandRequest)
    {
        commandRequest.SetId(id);

        var updateLoanResult = await _mediator.Send(commandRequest);

        if (!updateLoanResult.Success)
            return BadRequest(updateLoanResult);

        return Ok(updateLoanResult);
    }
}
