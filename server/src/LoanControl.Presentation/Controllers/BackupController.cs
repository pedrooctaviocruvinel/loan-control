using LoanControl.Application.BackupContext.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace LoanControl.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BackupController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateBackup()
        {
            var generateBackupResult = await _mediator.Send(new GenerateBackupCommandRequest());

            if (!generateBackupResult.Success)
                return BadRequest(generateBackupResult);

            var file = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(generateBackupResult.Data));

            return File(file, "application/json", "backup.json");
        }

        [HttpPost("execute")]
        public async Task<IActionResult> ExecuteBackup([FromForm] IFormFile file)
        {
            ExecuteBackupCommandRequest commandRequest;

            using (var streamReader = new StreamReader(file.OpenReadStream()))
            {
                var jsonContent = streamReader.ReadToEnd();

                commandRequest = JsonSerializer.Deserialize<ExecuteBackupCommandRequest>(jsonContent);
            }

            var executeMigrationResult = await _mediator.Send(commandRequest);

            if (!executeMigrationResult.Success)
                return BadRequest(executeMigrationResult);

            return Ok(executeMigrationResult);
        }
    }
}
