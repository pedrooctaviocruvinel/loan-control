using LoanControl.CrossCutting;
using LoanControl.Infrastructure;
using LoanControl.Presentation.Configurations;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwagger(builder.Configuration);
builder.Services.AddDependencies(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();

    var applicationDataContext = scope.ServiceProvider.GetRequiredService<ApplicationDataContext>();

    await applicationDataContext.Database.MigrateAsync();
}

if (app.Environment.IsDevelopment())
    app.UseSwagger(builder.Configuration);

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
